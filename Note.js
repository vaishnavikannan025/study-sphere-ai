import mongoose from 'mongoose'

const chunkSchema = new mongoose.Schema({
  chunkContent: {
    type: String,
    required: true
  },
  embedding: {
    type: [Number], // 768 float array
    required: true
  }
})

const noteSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  content: {
    type: String,
    required: true
  },
  fileUrl: {
    type: String
  },
  chunks: [chunkSchema]
}, {
  timestamps: true
})

const Note = mongoose.model('Note', noteSchema)
export default Note
