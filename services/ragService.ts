
import { DocumentSource } from "../types";


export class RAGService {
  /**
   * Simple chunking logic: split text by paragraphs or double newlines
   * with a rough window size and overlap simulation.
   */
  chunkDocument(text: string): string[] {
    const chunks = text.split(/\n\n+/).filter(p => p.trim().length > 20);
    // If text is very long and has few double newlines, split by sentence
    if (chunks.length < 5 && text.length > 500) {
      return text.match(/[^.!?]+[.!?]+/g) || [text];
    }
    return chunks;
  }

  /**
   * Simulates a vector search retrieval from a local "index"
   * In a real app, this would query MongoDB Atlas Vector Search
   */
async retrieveRelevantContext(
  query: string,
  documents: DocumentSource[]
): Promise<{ context: string; sourceNames: string[] }> {

  const queryTerms = query
    .toLowerCase()
    .split(/\W+/)
    .filter(t => t.length > 2);

  const matchedChunks: { chunk: string; source: string; score: number }[] = [];

  for (const doc of documents) {
    for (const chunk of doc.chunks) {
      const chunkLower = chunk.toLowerCase();
      let score = 0;

      for (const term of queryTerms) {
        if (chunkLower.includes(term)) {
          score++;
        }
      }

      if (score > 0) {
        matchedChunks.push({
          chunk,
          source: doc.name,
          score
        });
      }
    }
  }

  if (matchedChunks.length === 0) {
    return { context: "", sourceNames: [] };
  }

  const topChunks = matchedChunks
    .sort((a, b) => b.score - a.score)
    .slice(0, 1);

  return {
    context: topChunks[0].chunk,
    sourceNames: [topChunks[0].source]
  };
}
}
// Refund Policy
const refundPolicyText = `
Refund requests must be raised within 7 working days along with a valid invoice.
Approved refunds are processed within 5–7 business days.
Refunds are not applicable for customized services or digital products once accessed.
`;

// HR Policies
const hrPoliciesText = `
Employees may take extended sick leave up to 30 days per calendar year with valid medical certification and HR approval.
Employees may work from home up to two days per week based on role eligibility and manager approval.
`;

// IT Security Guidelines
const itSecurityText = `
Passwords must be at least 12 characters long and must be changed every 90 days.
Confidential data must not be downloaded to personal devices without written approval.
`;

// Operations SOP
const operationsSOPText = `
All customer tickets must be acknowledged within 24 hours.
High-priority issues must be resolved within 48 hours.
Issues exceeding SLA timelines must be escalated to the operations manager.
`;

export const ragService = new RAGService();

const indexedDocuments: DocumentSource[] = [
  {
    
    id: "doc-refund-001",
    name: "Refund_and_Return_Policy.pdf",
    size: 120000,
    uploadDate: new Date(),
    status: "ready",
    content: refundPolicyText,
    chunks: ragService.chunkDocument(refundPolicyText)
  },
  {
    id: "doc-hr-001",
    name: "HR_Policies.pdf",
    size: 95000,
    uploadDate: new Date(),
    status: "ready",
    content: hrPoliciesText,
    chunks: ragService.chunkDocument(hrPoliciesText)
  },
  {
    id: "doc-it-001",
    name: "IT_Security_Guidelines.pdf",
    size: 80000,
    uploadDate: new Date(),
    status: "ready",
    content: itSecurityText,
    chunks: ragService.chunkDocument(itSecurityText)
  },
  {
    id: "doc-ops-001",
    name: "Operations_SOP.pdf",
    size: 110000,
    uploadDate: new Date(),
    status: "ready",
    content: operationsSOPText,
    chunks: ragService.chunkDocument(operationsSOPText)
  }
];
console.log(
  "INDEXED DOCUMENTS:",
  indexedDocuments.map(d => ({
    name: d.name,
    chunks: d.chunks
  }))
);



export async function queryRAG(question: string) {
  console.log("🔥 queryRAG CALLED with:", question);

  const { context, sourceNames } =
    await ragService.retrieveRelevantContext(question, indexedDocuments);

  if (!context) {
    return {
      answer: "I don't know. The information is not available in the indexed documents.",
      sources: []
    };
  }

  return {
    answer: context,
    sources: sourceNames
  };
}



