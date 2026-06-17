import pdf from 'pdf-parse'
import Note from '../models/Note.js'
import { cleanText, splitText } from '../services/docService.js'
import { getEmbedding } from '../services/aiService.js'

// @desc    Upload a study note/file
// @route   POST /api/v1/notes
// @access  Private
export const uploadNote = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' })
    }

    let rawText = ''
    const title = req.body.title || req.file.originalname

    // Parse text depending on mime-type
    if (req.file.mimetype === 'application/pdf') {
      const parsedPdf = await pdf(req.file.buffer)
      rawText = parsedPdf.text
    } else {
      // Treat as plain text
      rawText = req.file.buffer.toString('utf-8')
    }

    const cleanedText = cleanText(rawText)
    if (!cleanedText) {
      return res.status(400).json({ message: 'Could not extract clean text from document' })
    }

    const textChunks = splitText(cleanedText, 1000, 200)

    // Process chunk embeddings in parallel batches
    const chunkPromises = textChunks.map(async (chunkText) => {
      const embeddingVec = await getEmbedding(chunkText)
      return {
        chunkContent: chunkText,
        embedding: embeddingVec
      }
    })

    const noteChunks = await Promise.all(chunkPromises)

    const note = await Note.create({
      user: req.user._id,
      title,
      content: cleanedText,
      chunks: noteChunks
    })

    // Return note profile without raw chunk vectors for network thriftiness
    res.status(201).json({
      _id: note._id,
      title: note.title,
      chunksCount: note.chunks.length,
      createdAt: note.createdAt
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// @desc    Get all user notes
// @route   GET /api/v1/notes
// @access  Private
export const getNotes = async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user._id }).select('title createdAt')
    res.json(notes)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// @desc    Get user note by ID
// @route   GET /api/v1/notes/:id
// @access  Private
export const getNoteById = async (req, res) => {
  try {
    const note = await Note.findOne({ _id: req.params.id, user: req.user._id }).select('-chunks.embedding')
    if (note) {
      res.json(note)
    } else {
      res.status(404).json({ message: 'Note not found' })
    }
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// @desc    Delete user note by ID
// @route   DELETE /api/v1/notes/:id
// @access  Private
export const deleteNote = async (req, res) => {
  try {
    const note = await Note.findOneAndDelete({ _id: req.params.id, user: req.user._id })
    if (note) {
      res.json({ message: 'Note removed successfully' })
    } else {
      res.status(404).json({ message: 'Note not found' })
    }
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
