// src/app-design/schemas/implementation-plan.schema.ts
export const implementationPlanSchema = {
  name: 'implementation_plan',
  strict: true,
  schema: {
    type: 'object',
    additionalProperties: false,
    properties: {
      blueprint: {
        type: 'object',
        additionalProperties: false,
        properties: {
          projectName: { type: 'string' },
          summary: { type: 'string' },
          modules: {
            type: 'array',
            items: {
              type: 'object',
              additionalProperties: false,
              properties: {
                name: { type: 'string' },
                responsibility: { type: 'string' },
                entities: { type: 'array', items: { type: 'string' } },
                endpoints: { type: 'array', items: { type: 'string' } },
              },
              required: ['name', 'responsibility', 'entities', 'endpoints'],
            },
          },
        },
        required: ['projectName', 'summary', 'modules'],
      },
      apiRoutes: {
        type: 'array',
        items: {
          type: 'object',
          additionalProperties: false,
          properties: {
            method: { type: 'string', enum: ['GET', 'POST', 'PATCH', 'DELETE'] },
            path: { type: 'string' },
            description: { type: 'string' },
            module: { type: 'string' },
          },
          required: ['method', 'path', 'description', 'module'],
        },
      },
      generatedFiles: {
        type: 'array',
        items: {
          type: 'object',
          additionalProperties: false,
          properties: {
            path: { type: 'string' },
            description: { type: 'string' },
            language: { type: 'string', enum: ['ts', 'json', 'md'] },
            content: { type: 'string' },
          },
          required: ['path', 'description', 'language', 'content'],
        },
      },
      nextActions: {
        type: 'array',
        items: { type: 'string' },
      },
    },
    required: ['blueprint', 'apiRoutes', 'generatedFiles', 'nextActions'],
  },
} as const;