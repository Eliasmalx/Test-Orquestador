// // src/app-design/steps/generate-backlog.step.ts
// import { Injectable } from '@nestjs/common';
// import { DesignContext } from '../interfaces/design-context.interface';
// import { OrchestratorStep } from '../interfaces/orchestrator-step.interface';
// import { StepResult } from '../interfaces/step-result.interface';
// import { AppDesignPrompts } from '../prompts/app-design.prompts';
// import { LlmService } from '../services/llm.service';

// @Injectable()
// export class GenerateBacklogStep implements OrchestratorStep<DesignContext> {
//   name = 'generate-backlog';

//   constructor(private readonly llmService: LlmService) {}

//   async execute(context: DesignContext): Promise<StepResult<DesignContext>> {
//     try {
//       const result = await this.llmService.generateJson<{ items: DesignContext['backlog'] }>(
//         AppDesignPrompts.backlog(context),
//         context.runId,
//       );

//       context.backlog = result.items ?? [];
//       return { ok: true, context };
//     } catch (error: any) {
//       return {
//         ok: false,
//         context,
//         error: error.message,
//         retryable: true,
//       };
//     }
//   }
// }