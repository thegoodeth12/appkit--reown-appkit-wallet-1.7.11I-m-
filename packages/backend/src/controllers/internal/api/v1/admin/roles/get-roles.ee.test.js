import { vi, describe, it, expect, beforeEach } from 'vitest';
import request from 'supertest';
import app from '../../../../../../app.js';
import createAuthTokenByUserId from '@/helpers/create-auth-token-by-user-id.js';
import { createRole } from '@/factories/role.js';
import { createUser } from '@/factories/user.js';
import getRolesMock from '@/mocks/rest/internal/api/v1/admin/roles/get-roles.ee.js';
import * as license from '@/helpers/license.ee.js';

describe('GET /internal/api/v1/admin/roles', () => {
  let roleOne, roleTwo, currentUser, token;

  beforeEach(async () => {
    roleOne = await createRole({ name: 'Admin' });
    roleTwo = await createRole({ name: 'User' });
    currentUser = await createUser({ roleId: roleOne.id });

    token = await createAuthTokenByUserId(currentUser.id);
  });

  it('should return roles', async () => {
    vi.spyOn(license, 'hasValidLicense').mockResolvedValue(true);

    const response = await request(app)
      .get('/internal/api/v1/admin/roles')
      .set('Authorization', token)
      .expect(200);

    const expectedPayload = await getRolesMock([roleOne, roleTwo]);

    expect(response.body).toStrictEqual(expectedPayload);
  });
});
