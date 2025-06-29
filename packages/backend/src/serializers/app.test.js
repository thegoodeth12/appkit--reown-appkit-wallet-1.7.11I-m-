import { describe, it, expect } from 'vitest';
import App from '@/models/app.js';
import appSerializer from '@/serializers/app.js';

describe('appSerializer', () => {
  it('should return app data', async () => {
    const app = await App.findOneByKey('deepl');

    const expectedPayload = {
      name: app.name,
      key: app.key,
      iconUrl: app.iconUrl,
      authDocUrl: app.authDocUrl,
      supportsConnections: app.supportsConnections,
      supportsOauthClients: app.auth.generateAuthUrl ? true : false,
      primaryColor: app.primaryColor,
    };

    expect(appSerializer(app)).toStrictEqual(expectedPayload);
  });
});
