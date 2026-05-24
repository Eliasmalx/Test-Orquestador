// src/app-design/interfaces/generated-file.interface.ts
export interface GeneratedFile {
  path: string;
  description: string;
  language: 'ts' | 'json' | 'md';
  content: string;
}