import { GoogleGenerativeAI } from '@google/generative-ai'
import dotenv from 'dotenv'

dotenv.config()

if (!process.env.GEMINI_API_KEY) {
  console.warn('Warning: GEMINI_API_KEY is not defined in the environment variables.')
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || 'dummy_key')

export default genAI
