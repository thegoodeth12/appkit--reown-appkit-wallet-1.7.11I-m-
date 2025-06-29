import { describe, it, expect } from 'vitest';
import App from '@/models/app.js';
import triggerSerializer from '@/serializers/trigger.js';

describe('triggerSerializer', () => {
  it('should return the trigger data', async () => {
    const triggers = await App.findTriggersByKey('github');
    const trigger = triggers[0];

    const expectedPayload = {
      description: trigger.description,
      key: trigger.key,
      name: trigger.name,
      pollInterval: trigger.pollInterval,
      showWebhookUrl: trigger.showWebhookUrl,
      type: trigger.type,
    };

    expect(triggerSerializer(trigger)).toStrictEqual(expectedPayload);
  });
});
