// src/app-design/app-design.controller.ts
import { Body, Controller, Post } from '@nestjs/common';
import { AppDesignOrchestrator } from './app-design.orchestrator';
import { DesignAppDto } from './dto/design-app.dto';

@Controller('app-design')
export class AppDesignController {
  constructor(private readonly orchestrator: AppDesignOrchestrator) {}

  @Post()
  async design(@Body() dto: DesignAppDto) {
    return this.orchestrator.execute({
      idea: dto.idea,
      targetUsers: dto.targetUsers,
      platform: dto.platform,
    });
  }
}