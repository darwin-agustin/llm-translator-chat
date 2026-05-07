export interface Message {
  role: 'user' | 'assistant' | 'system' | 'llm';
  text: string;
}