import { vi, describe, it, expect, beforeEach } from 'vitest';
import request from 'supertest';
import Crypto from 'crypto';
import app from '../../../../../../app.js';
import createAuthTokenByUserId from '@/helpers/create-auth-token-by-user-id.js';
import { createRole } from '@/factories/role.js';
import { createUser } from '@/factories/user.js';
import { createSamlAuthProvider } from '@/factories/saml-auth-provider.ee.js';
import getSamlAuthProviderMock from '@/mocks/rest/internal/api/v1/admin/saml-auth-providers/get-saml-auth-provider.ee.js';
import * as license from '@/helpers/license.ee.js';

describe('GET /internal/api/v1/admin/saml-auth-provider/:samlAuthProviderId', () => {
  let samlAuthProvider, currentUser, token;

  beforeEach(async () => {
    const role = await createRole({ name: 'Admin' });
    currentUser = await createUser({ roleId: role.id });
    samlAuthProvider = await createSamlAuthProvider();

    token = await createAuthTokenByUserId(currentUser.id);
  });

  it('should return saml auth provider with specified id', async () => {
    vi.spyOn(license, 'hasValidLicense').mockResolvedValue(true);

    const response = await request(app)
      .get(`/internal/api/v1/admin/saml-auth-providers/${samlAuthProvider.id}`)
      .set('Authorization', token)
      .expect(200);

    const expectedPayload = await getSamlAuthProviderMock(samlAuthProvider);

    expect(response.body).toStrictEqual(expectedPayload);
  });

  it('should return not found response for not existing saml auth provider UUID', async () => {
    vi.spyOn(license, 'hasValidLicense').mockResolvedValue(true);

    const notExistingSamlAuthProviderUUID = Crypto.randomUUID();

    await request(app)
      .get(
        `/internal/api/v1/admin/saml-auth-providers/${notExistingSamlAuthProviderUUID}`
      )
      .set('Authorization', token)
      .expect(404);
  });

  it('should return bad request response for invalid UUID', async () => {
    vi.spyOn(license, 'hasValidLicense').mockResolvedValue(true);

    await request(app)
      .get(
        '/internal/api/v1/admin/saml-auth-providers/invalidSamlAuthProviderUUID'
      )
      .set('Authorization', token)
      .expect(400);
  });
});
