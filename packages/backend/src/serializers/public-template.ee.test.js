import { describe, it, expect, beforeEach } from 'vitest';
import templateSerializer from '@/serializers/template.ee.js';
import { createTemplate } from '@/factories/template.js';

describe('publicTemplateSerializer', () => {
  let template;

  beforeEach(async () => {
    template = await createTemplate();
  });

  it('should return template data', async () => {
    const expectedPayload = {
      id: template.id,
      name: template.name,
      flowData: template.getFlowDataWithIconUrls(),
      createdAt: template.createdAt.getTime(),
      updatedAt: template.updatedAt.getTime(),
    };

    expect(templateSerializer(template)).toStrictEqual(expectedPayload);
  });
});
