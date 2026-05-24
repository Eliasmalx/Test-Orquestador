// src/app-design/app-design.controller.ts
import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AppDesignOrchestrator } from './app-design.orchestrator';
import { DesignAppDto } from './dto/design-app.dto';
import { AppDesignResponseDto } from './dto/app-design-response.dto';

@ApiTags('app-design')
@Controller('app-design')
export class AppDesignController {
  constructor(private readonly orchestrator: AppDesignOrchestrator) {}

  @Post()
  @ApiOperation({
    summary: 'Genera análisis, arquitectura y scaffolding inicial de una app',
  })
  @ApiBody({ type: DesignAppDto })
  @ApiResponse({
    status: 201,
    description: 'Diseño y scaffolding generados correctamente',
    type: AppDesignResponseDto,
  })
  async design(@Body() dto: DesignAppDto) {
  return this.orchestrator.execute({
    idea: dto.idea,
    targetUsers: dto.targetUsers,
    platform: dto.platform,
  });
}
}