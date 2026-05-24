// src/app-design/app-design.module.ts
import { Module } from '@nestjs/common';
import { AppDesignController } from './app-design.controller';
import { AppDesignOrchestrator } from './app-design.orchestrator';
import { AnalyzeIdeaStep } from './steps/analyze-idea.step';
import { GenerateRequirementsStep } from './steps/generate-requirements.step';
import { ProposeArchitectureStep } from './steps/propose-architecture.step';
import { GenerateImplementationPlanStep } from './steps/generate-implementation-plan.step';
import { LlmService } from './services/llm.service';

@Module({
  controllers: [AppDesignController],
  providers: [
    AppDesignOrchestrator,
    AnalyzeIdeaStep,
    GenerateRequirementsStep,
    ProposeArchitectureStep,
    GenerateImplementationPlanStep,
    LlmService,
  ],
})
export class AppDesignModule {}