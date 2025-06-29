import { vi, describe, it, expect, beforeEach } from 'vitest';
import request from 'supertest';

import app from '../../../../../../app.js';
import createAuthTokenByUserId from '@/helpers/create-auth-token-by-user-id.js';
import { createUser } from '@/factories/user.js';
import { createRole } from '@/factories/role.js';
import createAppConfigMock from '@/mocks/rest/internal/api/v1/admin/apps/create-config.js';
import { createAppConfig } from '@/factories/app-config.js';
import * as license from '@/helpers/license.ee.js';

describe('PATCH /internal/api/v1/admin/apps/:appKey/config', () => {
  let currentUser, adminRole, token;

  beforeEach(async () => {
    vi.spyOn(license, 'hasValidLicense').mockResolvedValue(true);

    adminRole = await createRole({ name: 'Admin' });
    currentUser = await createUser({ roleId: adminRole.id });

    token = await createAuthTokenByUserId(currentUser.id);
  });

  it('should return updated app config', async () => {
    const appConfig = {
      key: 'gitlab',
      useOnlyPredefinedAuthClients: true,
      disabled: false,
    };

    await createAppConfig(appConfig);

    const newAppConfigValues = {
      disabled: true,
      useOnlyPredefinedAuthClients: false,
    };

    const response = await request(app)
      .patch('/internal/api/v1/admin/apps/gitlab/config')
      .set('Authorization', token)
      .send(newAppConfigValues)
      .expect(200);

    const expectedPayload = createAppConfigMock({
      ...newAppConfigValues,
      key: 'gitlab',
    });

    expect(response.body).toMatchObject(expectedPayload);
  });

  it('should return not found response for unexisting app config', async () => {
    const appConfig = {
      disabled: true,
      useOnlyPredefinedAuthClients: false,
    };

    await request(app)
      .patch('/internal/api/v1/admin/apps/gitlab/config')
      .set('Authorization', token)
      .send(appConfig)
      .expect(404);
  });

  it('should return HTTP 422 for invalid app config data', async () => {
    const appConfig = {
      key: 'gitlab',
      useOnlyPredefinedAuthClients: true,
      disabled: false,
    };

    await createAppConfig(appConfig);

    const response = await request(app)
      .patch('/internal/api/v1/admin/apps/gitlab/config')
      .set('Authorization', token)
      .send({
        disabled: 'invalid value type',
      })
      .expect(422);

    expect(response.body.meta.type).toStrictEqual('ModelValidation');
    expect(response.body.errors).toMatchObject({
      disabled: ['must be boolean'],
    });
  });
});
