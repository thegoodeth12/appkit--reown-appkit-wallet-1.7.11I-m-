import { vi, describe, it, expect, beforeEach } from 'vitest';
import request from 'supertest';
import app from '../../../../../../app.js';
import createAuthTokenByUserId from '@/helpers/create-auth-token-by-user-id.js';
import { createRole } from '@/factories/role.js';
import { createUser } from '@/factories/user.js';
import { createSamlAuthProvider } from '@/factories/saml-auth-provider.ee.js';
import getSamlAuthProvidersMock from '@/mocks/rest/internal/api/v1/admin/saml-auth-providers/get-saml-auth-providers.ee.js';
import * as license from '@/helpers/license.ee.js';

describe('GET /internal/api/v1/admin/saml-auth-providers', () => {
  let samlAuthProviderOne, samlAuthProviderTwo, currentUser, token;

  beforeEach(async () => {
    const role = await createRole({ name: 'Admin' });
    currentUser = await createUser({ roleId: role.id });

    samlAuthProviderOne = await createSamlAuthProvider();
    samlAuthProviderTwo = await createSamlAuthProvider();

    token = await createAuthTokenByUserId(currentUser.id);
  });

  it('should return saml auth providers', async () => {
    vi.spyOn(license, 'hasValidLicense').mockResolvedValue(true);

    const response = await request(app)
      .get('/internal/api/v1/admin/saml-auth-providers')
      .set('Authorization', token)
      .expect(200);

    const expectedPayload = await getSamlAuthProvidersMock([
      samlAuthProviderTwo,
      samlAuthProviderOne,
    ]);

    expect(response.body).toStrictEqual(expectedPayload);
  });
});
