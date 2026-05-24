// src/app-design/prompts/app-design.prompts.ts
import { DesignContext } from '../interfaces/design-context.interface';

export class AppDesignPrompts {
  static analyze(context: DesignContext) {
    return `
Analiza esta idea de aplicación y responde SOLO JSON válido.

INPUT:
- idea: ${context.input.idea}
- targetUsers: ${context.input.targetUsers ?? 'unknown'}
- platform: ${context.input.platform ?? 'unknown'}

JSON schema:
{
  "appType": "string",
  "coreProblem": "string",
  "complexity": "low|medium|high",
  "summary": "string"
}
`;
  }

  static requirements(context: DesignContext) {
    return `
Genera requisitos para esta app y responde SOLO JSON válido.

INPUT:
- idea: ${context.input.idea}
- analysisSummary: ${context.analysis?.summary ?? ''}

JSON schema:
{
  "functional": ["string"],
  "nonFunctional": ["string"]
}
`;
  }

  static architecture(context: DesignContext) {
    return `
Propón arquitectura técnica para esta app y responde SOLO JSON válido.

INPUT:
- idea: ${context.input.idea}
- platform: ${context.input.platform ?? 'web'}
- complexity: ${context.analysis?.complexity ?? 'medium'}
- targetUsers: ${context.input.targetUsers ?? 'unknown'}

JSON schema:
{
  "frontend": "string",
  "backend": "string",
  "database": "string",
  "modules": ["string"],
  "integrations": ["string"]
}
`;
  }

  static backlog(context: DesignContext) {
    return `
Genera backlog inicial para MVP y responde SOLO JSON válido.

INPUT:
- idea: ${context.input.idea}
- appType: ${context.analysis?.appType ?? ''}
- modules: ${(context.architecture?.modules ?? []).join(', ')}

JSON schema:
{
  "items": [
    {
      "title": "string",
      "description": "string",
      "priority": "high|medium|low"
    }
  ]
}
`;
  }
}