import mongoose from 'mongoose'

const chatSessionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    default: 'New Chat Session',
    trim: true
  }
}, {
  timestamps: true
})

const chatMessageSchema = new mongoose.Schema({
  session: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ChatSession',
    required: true
  },
  sender: {
    type: String,
    enum: ['user', 'assistant'],
    required: true
  },
  content: {
    type: String,
    required: true
  }
}, {
  timestamps: true
})

export const ChatSession = mongoose.model('ChatSession', chatSessionSchema)
export const ChatMessage = mongoose.model('ChatMessage', chatMessageSchema)
