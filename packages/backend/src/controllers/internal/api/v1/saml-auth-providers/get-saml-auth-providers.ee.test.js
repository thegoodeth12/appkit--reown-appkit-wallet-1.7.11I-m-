import { vi, describe, it, expect, beforeEach } from 'vitest';
import request from 'supertest';
import app from '../../../../../app.js';
import { createSamlAuthProvider } from '@/factories/saml-auth-provider.ee.js';
import getSamlAuthProvidersMock from '@/mocks/rest/internal/api/v1/saml-auth-providers/get-saml-auth-providers.js';
import * as license from '@/helpers/license.ee.js';

describe('GET /internal/api/v1/saml-auth-providers', () => {
  let samlAuthProviderOne, samlAuthProviderTwo;

  beforeEach(async () => {
    samlAuthProviderOne = await createSamlAuthProvider();
    samlAuthProviderTwo = await createSamlAuthProvider();
  });

  it('should return saml auth providers', async () => {
    vi.spyOn(license, 'hasValidLicense').mockResolvedValue(true);

    const response = await request(app)
      .get('/internal/api/v1/saml-auth-providers')
      .expect(200);

    const expectedPayload = await getSamlAuthProvidersMock([
      samlAuthProviderTwo,
      samlAuthProviderOne,
    ]);

    expect(response.body).toStrictEqual(expectedPayload);
  });
});
