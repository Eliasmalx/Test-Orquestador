// src/app-design/interfaces/step-result.interface.ts
export interface StepResult<TContext> {
  ok: boolean;
  context: TContext;
  error?: string;
  retryable?: boolean;
  metadata?: Record<string, any>;
}