import { describe, it, expect, beforeEach } from 'vitest';
import { createStep } from '@/factories/step.js';
import { createExecutionStep } from '@/factories/execution-step.js';
import stepSerializer from '@/serializers/step.js';
import executionStepSerializer from '@/serializers/execution-step.js';

describe('stepSerializer', () => {
  let step;

  beforeEach(async () => {
    step = await createStep();
  });

  it('should return step data', async () => {
    const expectedPayload = {
      id: step.id,
      type: step.type,
      key: step.key,
      name: step.name,
      appKey: step.appKey,
      iconUrl: step.iconUrl,
      webhookUrl: step.webhookUrl,
      status: step.status,
      position: step.position,
      parameters: step.parameters,
    };

    expect(stepSerializer(step)).toStrictEqual(expectedPayload);
  });

  it('should return step data with the last execution step', async () => {
    const executionStep = await createExecutionStep({ stepId: step.id });

    step.lastExecutionStep = executionStep;

    const expectedPayload = {
      lastExecutionStep: executionStepSerializer(executionStep),
    };

    expect(stepSerializer(step)).toMatchObject(expectedPayload);
  });

  it('should return step data with the execution steps', async () => {
    const executionStepOne = await createExecutionStep({ stepId: step.id });
    const executionStepTwo = await createExecutionStep({ stepId: step.id });

    step.executionSteps = [executionStepOne, executionStepTwo];

    const expectedPayload = {
      executionSteps: [
        executionStepSerializer(executionStepOne),
        executionStepSerializer(executionStepTwo),
      ],
    };

    expect(stepSerializer(step)).toMatchObject(expectedPayload);
  });
});
