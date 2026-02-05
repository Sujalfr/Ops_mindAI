
import { GoogleGenAI } from "@google/genai";
import { RAGResponse } from "../types";

export class GeminiService {
  /**
   * Generates a RAG-based answer using Gemini 3 Flash.
   */
  async generateRAGAnswer(query: string, context: string, sourceNames: string[]): Promise<RAGResponse> {
    const systemInstruction = `
      You are OpsMind AI, a Context-Aware Corporate Knowledge Assistant.
      Your goal is to answer questions strictly using the provided document context.
      
      RULES:
      1. Answer ONLY from the provided context chunks.
      2. If the answer is not contained in the context, you MUST say exactly: "I don't know. The information is not available in the indexed documents."
      3. Do NOT use outside knowledge.
      4. Be concise, professional, and enterprise-safe.
      5. Do not mention "the context" or "the documents" in your answer unless necessary for clarity. Just provide the answer.
    `;

    const prompt = `
      Context:
      ${context}

      User Query: ${query}
    `;

    try {
      /* Initialize GoogleGenAI directly using process.env.API_KEY per coding guidelines */
      const ai = new GoogleGenAI({
  apiKey: import.meta.env.VITE_GEMINI_API_KEY
});

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
        config: {
          systemInstruction,
          temperature: 0.1, // Low temperature for factual consistency in enterprise contexts
          topP: 0.8,
          topK: 40,
        },
      });

      const text = response.text || "I don't know. The information is not available in the indexed documents.";
      
      // If we got the guardrail response, we don't show sources
      const isUnknown = text.toLowerCase().includes("i don't know");
      
      return {
        answer: text,
        sources: isUnknown ? [] : sourceNames
      };
    } catch (error) {
      console.error("Gemini RAG Error:", error);
      return {
        answer: "An error occurred while communicating with the AI. Please try again later.",
        sources: []
      };
    }
  }
}

export const geminiService = new GeminiService();
