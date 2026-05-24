import { ApiProperty } from '@nestjs/swagger';

export class AnalysisDto {
  @ApiProperty({ example: 'event discovery' })
  appType!: string;

  @ApiProperty({ example: 'Dificultad para encontrar eventos relevantes en Madrid' })
  coreProblem!: string;

  @ApiProperty({ example: 'medium', enum: ['low', 'medium', 'high'] })
  complexity!: 'low' | 'medium' | 'high';

  @ApiProperty({ example: 'Aplicación web para descubrir eventos filtrados por intereses, fecha y ubicación.' })
  summary!: string;
}

export class RequirementsDto {
  @ApiProperty({
    type: [String],
    example: ['Registro e inicio de sesión', 'Búsqueda de eventos'],
  })
  functional!: string[];

  @ApiProperty({
    type: [String],
    example: ['Autenticación segura', 'Arquitectura modular'],
  })
  nonFunctional!: string[];
}

export class ArchitectureDto {
  @ApiProperty({ example: 'Next.js' })
  frontend!: string;

  @ApiProperty({ example: 'NestJS' })
  backend!: string;

  @ApiProperty({ example: 'PostgreSQL' })
  database!: string;

  @ApiProperty({
    type: [String],
    example: ['auth', 'users', 'events', 'recommendations'],
  })
  modules!: string[];

  @ApiProperty({
    type: [String],
    example: ['OpenRouter', 'Redis'],
  })
  integrations!: string[];
}

export class BlueprintModuleDto {
  @ApiProperty({ example: 'events' })
  name!: string;

  @ApiProperty({ example: 'gestión y consulta de eventos' })
  responsibility!: string;

  @ApiProperty({ type: [String], example: ['Event'] })
  entities!: string[];

  @ApiProperty({
    type: [String],
    example: ['GET /events', 'GET /events/:id', 'POST /events'],
  })
  endpoints!: string[];
}

export class BlueprintDto {
  @ApiProperty({ example: 'madrid-events-app' })
  projectName!: string;

  @ApiProperty({ example: 'Backend NestJS modular para descubrir eventos con recomendaciones' })
  summary!: string;

  @ApiProperty({ type: [BlueprintModuleDto] })
  modules!: BlueprintModuleDto[];
}

export class ApiRouteDto {
  @ApiProperty({ example: 'GET', enum: ['GET', 'POST', 'PATCH', 'DELETE'] })
  method!: 'GET' | 'POST' | 'PATCH' | 'DELETE';

  @ApiProperty({ example: '/events' })
  path!: string;

  @ApiProperty({ example: 'Listar eventos' })
  description!: string;

  @ApiProperty({ example: 'events' })
  module!: string;
}

export class GeneratedFileDto {
  @ApiProperty({ example: 'src/events/events.module.ts' })
  path!: string;

  @ApiProperty({ example: 'Módulo principal de eventos' })
  description!: string;

  @ApiProperty({ example: 'ts', enum: ['ts', 'json', 'md'] })
  language!: 'ts' | 'json' | 'md';

  @ApiProperty({
    example:
      "import { Module } from '@nestjs/common';\nimport { EventsController } from './events.controller';",
  })
  content!: string;
}

export class BacklogItemDto {
  @ApiProperty({ example: 'Next action 1' })
  title!: string;

  @ApiProperty({ example: 'Crear módulo events con controller y service' })
  description!: string;

  @ApiProperty({ example: 'high', enum: ['high', 'medium', 'low'] })
  priority!: 'high' | 'medium' | 'low';
}

export class MetaErrorDto {
  @ApiProperty({ example: 'generate-implementation-plan' })
  step!: string;

  @ApiProperty({ example: 'Invalid LLM response format' })
  message!: string;
}

export class MetaDto {
  @ApiProperty({
    type: [String],
    example: [
      'analyze-idea',
      'generate-requirements',
      'propose-architecture',
      'generate-implementation-plan',
    ],
  })
  completedSteps!: string[];

  @ApiProperty({ type: [MetaErrorDto] })
  errors!: MetaErrorDto[];
}

export class InputDto {
  @ApiProperty({ example: 'Una app para descubrir eventos en Madrid' })
  idea!: string;

  @ApiProperty({ example: 'jóvenes profesionales', required: false })
  targetUsers?: string;

  @ApiProperty({ example: 'web', enum: ['web', 'mobile', 'desktop', 'api'], required: false })
  platform?: 'web' | 'mobile' | 'desktop' | 'api';
}

export class AppDesignResponseDto {
  @ApiProperty({ example: '4bc8922f-df97-4322-829c-c675722814b1' })
  runId!: string;

  @ApiProperty({ type: InputDto })
  input!: InputDto;

  @ApiProperty({ type: MetaDto })
  meta!: MetaDto;

  @ApiProperty({ type: AnalysisDto })
  analysis!: AnalysisDto;

  @ApiProperty({ type: RequirementsDto })
  requirements!: RequirementsDto;

  @ApiProperty({ type: ArchitectureDto })
  architecture!: ArchitectureDto;

  @ApiProperty({ type: BlueprintDto })
  blueprint!: BlueprintDto;

  @ApiProperty({ type: [ApiRouteDto] })
  apiRoutes!: ApiRouteDto[];

  @ApiProperty({ type: [GeneratedFileDto] })
  generatedFiles!: GeneratedFileDto[];

  @ApiProperty({ type: [BacklogItemDto] })
  backlog!: BacklogItemDto[];
}