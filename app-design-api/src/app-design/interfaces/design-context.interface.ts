// src/app-design/interfaces/design-context.interface.ts
export interface DesignContext {
  runId: string;
  input: {
    idea: string;
    targetUsers?: string;
    platform?: 'web' | 'mobile' | 'desktop' | 'api';
  };
  analysis?: {
    appType: string;
    coreProblem: string;
    complexity: 'low' | 'medium' | 'high';
    summary: string;
  };
  requirements?: {
    functional: string[];
    nonFunctional: string[];
  };
  architecture?: {
    frontend?: string;
    backend?: string;
    database?: string;
    modules?: string[];
    integrations?: string[];
  };
  blueprint?: {
    projectName: string;
    summary: string;
    modules: Array<{
      name: string;
      responsibility: string;
      entities?: string[];
      endpoints?: string[];
    }>;
  };
  generatedFiles?: Array<{
    path: string;
    description: string;
    language: 'ts' | 'json' | 'md';
    content: string;
  }>;
  apiRoutes?: Array<{
    method: 'GET' | 'POST' | 'PATCH' | 'DELETE';
    path: string;
    description: string;
    module: string;
  }>;
  backlog?: Array<{
    title: string;
    description: string;
    priority: 'high' | 'medium' | 'low';
  }>;
  meta: {
    currentStep?: string;
    completedSteps: string[];
    failedStep?: string;
    errors: Array<{ step: string; message: string }>;
  };
}