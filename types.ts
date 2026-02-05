
export interface DocumentSource {
  id: string;
  name: string;
  size: number;
  uploadDate: Date;
  content: string;
  chunks: string[];
  status: 'indexing' | 'ready' | 'error';
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  sources?: string[];
  isLoading?: boolean;
}

export interface RAGResponse {
  answer: string;
  sources: string[];
}
