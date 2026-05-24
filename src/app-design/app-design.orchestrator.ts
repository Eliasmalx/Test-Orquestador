// src/app-design/app-design.orchestrator.ts
import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { AnalyzeIdeaStep } from './steps/analyze-idea.step';
import { GenerateRequirementsStep } from './steps/generate-requirements.step';
import { ProposeArchitectureStep } from './steps/propose-architecture.step';
import { GenerateBacklogStep } from './steps/generate-backlog.step';
import { DesignContext } from './interfaces/design-context.interface';
import { OrchestratorStepException } from './exceptions/orchestrator.exception';

@Injectable()
export class AppDesignOrchestrator {
  constructor(
    private readonly analyzeIdeaStep: AnalyzeIdeaStep,
    private readonly generateRequirementsStep: GenerateRequirementsStep,
    private readonly proposeArchitectureStep: ProposeArchitectureStep,
    private readonly generateBacklogStep: GenerateBacklogStep,
  ) {}

  async execute(input: DesignContext['input']) {
    let context: DesignContext = {
      runId: randomUUID(),
      input,
      meta: {
        completedSteps: [],
        errors: [],
      },
    };

    const steps = [
      this.analyzeIdeaStep,
      this.generateRequirementsStep,
      this.proposeArchitectureStep,
      this.generateBacklogStep,
    ];

    for (const step of steps) {
      context.meta.currentStep = step.name;

      const result = await step.execute(context);
      context = result.context;

      if (!result.ok) {
        context.meta.failedStep = step.name;
        context.meta.errors.push({
          step: step.name,
          message: result.error ?? 'Unknown error',
        });

        throw new OrchestratorStepException(
          step.name,
          result.error ?? 'Step execution failed',
        );
      }

      context.meta.completedSteps.push(step.name);
    }

    delete context.meta.currentStep;
    return context;
  }
}