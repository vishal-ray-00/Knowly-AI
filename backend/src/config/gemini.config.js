import { GoogleGenAI } from "@google/genai";

export const EMBEDDING_MODEL = "gemini-embedding-001";

// Must match the numDimensions of the Atlas vector index (Step 10)
export const EMBEDDING_DIMENSIONS = 768;

const gemini = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export default gemini;