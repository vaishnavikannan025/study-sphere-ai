import { ChatSession, ChatMessage } from '../models/Chat.js'
import Note from '../models/Note.js'
import { getEmbedding, retrieveContext, getChatStream } from '../services/aiService.js'

// @desc    Create a new tutoring chat session
// @route   POST /api/v1/chat/sessions
// @access  Private
export const createSession = async (req, res) => {
  const { title } = req.body
  try {
    const session = await ChatSession.create({
      user: req.user._id,
      title: title || 'New Chat Session'
    })
    res.status(201).json(session)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// @desc    Get user chat sessions
// @route   GET /api/v1/chat/sessions
// @access  Private
export const getSessions = async (req, res) => {
  try {
    const sessions = await ChatSession.find({ user: req.user._id }).sort({ createdAt: -1 })
    res.json(sessions)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// @desc    Get messages in a session
// @route   GET /api/v1/chat/sessions/:id/messages
// @access  Private
export const getSessionMessages = async (req, res) => {
  try {
    const session = await ChatSession.findOne({ _id: req.params.id, user: req.user._id })
    if (!session) {
      return res.status(404).json({ message: 'Chat session not found' })
    }

    const messages = await ChatMessage.find({ session: req.params.id }).sort({ createdAt: 1 })
    res.json(messages)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// @desc    Stream AI response via Server-Sent Events (SSE)
// @route   GET /api/v1/chat/stream
// @access  Private
export const askAIStream = async (req, res) => {
  const { sessionId, query, noteId } = req.query

  if (!sessionId || !query) {
    return res.status(400).json({ message: 'SessionId and query parameters are required' })
  }

  try {
    const session = await ChatSession.findOne({ _id: sessionId, user: req.user._id })
    if (!session) {
      return res.status(404).json({ message: 'Chat session not found' })
    }

    let contextText = ''

    // If note ID context is requested, find chunks and perform similarity lookup
    if (noteId) {
      const note = await Note.findOne({ _id: noteId, user: req.user._id })
      if (note) {
        const queryEmbedding = await getEmbedding(query)
        contextText = retrieveContext(note, queryEmbedding, 5)
      }
    }

    // Load recent message history for conversational followups
    const messageHistory = await ChatMessage.find({ session: sessionId })
      .sort({ createdAt: -1 })
      .limit(10)
    
    // Reverse messages to preserve chronological order for prompt context
    const recentHistory = messageHistory.reverse()

    // Configure response headers for Server-Sent Events (SSE)
    res.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive'
    })

    // Invoke Gemini Content Stream
    const resultStream = await getChatStream(recentHistory, contextText, query)
    let fullResponse = ''

    for await (const chunk of resultStream.stream) {
      const textVal = chunk.text()
      fullResponse += textVal
      res.write(`data: ${JSON.stringify({ text: textVal })}\n\n`)
    }

    // Persist messages in database
    await ChatMessage.create([
      { session: sessionId, sender: 'user', content: query },
      { session: sessionId, sender: 'assistant', content: fullResponse }
    ])

    res.write('event: end\ndata: \n\n')
    res.end()

  } catch (error) {
    console.error('SSE Stream Error:', error)
    // If stream fails, gracefully terminate event stream connection
    res.write(`data: ${JSON.stringify({ error: error.message })}\n\n`)
    res.end()
  }
}
