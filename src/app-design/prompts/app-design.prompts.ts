// src/app-design/prompts/app-design.prompts.ts
import { DesignContext } from '../interfaces/design-context.interface';

export class AppDesignPrompts {
  static implementationPlan(context: DesignContext) {
    return `
Diseña una implementación inicial real para una app usando NestJS backend.

IDEA:
- ${context.input.idea}

TARGET USERS:
- ${context.input.targetUsers ?? 'unknown'}

PLATFORM:
- ${context.input.platform ?? 'web'}

ANALYSIS:
- ${context.analysis?.summary ?? 'not available'}

REQUIREMENTS:
- Functional: ${(context.requirements?.functional ?? []).join(', ')}
- NonFunctional: ${(context.requirements?.nonFunctional ?? []).join(', ')}

ARCHITECTURE BASE:
- frontend: ${context.architecture?.frontend ?? 'unknown'}
- backend: ${context.architecture?.backend ?? 'NestJS'}
- database: ${context.architecture?.database ?? 'unknown'}

Necesito:
1. blueprint del proyecto,
2. módulos NestJS recomendados,
3. rutas API,
4. archivos iniciales listos para copiar,
5. siguientes pasos.

Los archivos generados deben ser pequeños pero reales.
Prioriza:
- module
- controller
- service
- dto
- entity/interface
- README técnico
`;
  }
}