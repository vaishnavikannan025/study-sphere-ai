import mongoose from 'mongoose'

const quizQuestionSchema = new mongoose.Schema({
  questionText: {
    type: String,
    required: true
  },
  options: {
    type: [String],
    required: true
  },
  correctOptionIndex: {
    type: Number,
    required: true
  },
  explanation: {
    type: String,
    required: true
  }
})

const quizSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  note: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Note'
  },
  title: {
    type: String,
    required: true
  },
  questions: [quizQuestionSchema]
}, {
  timestamps: true
})

const answerLogSchema = new mongoose.Schema({
  questionIndex: {
    type: Number,
    required: true
  },
  selectedOptionIndex: {
    type: Number,
    required: true
  },
  isCorrect: {
    type: Boolean,
    required: true
  }
})

const quizAttemptSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  quiz: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Quiz',
    required: true
  },
  score: {
    type: Number,
    required: true
  },
  totalQuestions: {
    type: Number,
    required: true
  },
  answers: [answerLogSchema]
}, {
  timestamps: true
})

export const Quiz = mongoose.model('Quiz', quizSchema)
export const QuizAttempt = mongoose.model('QuizAttempt', quizAttemptSchema)
