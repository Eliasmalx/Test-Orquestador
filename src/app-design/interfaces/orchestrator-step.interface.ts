// src/app-design/interfaces/orchestrator-step.interface.ts
import { StepResult } from './step-result.interface';

export interface OrchestratorStep<TContext> {
  name: string;
  execute(context: TContext): Promise<StepResult<TContext>>;
}