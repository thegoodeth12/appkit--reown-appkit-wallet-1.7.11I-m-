import { describe, it, expect, beforeEach } from 'vitest';
import request from 'supertest';
import App from '@/models/app.js';
import app from '../../../../../app.js';
import createAuthTokenByUserId from '@/helpers/create-auth-token-by-user-id.js';
import { createUser } from '@/factories/user.js';
import getAuthMock from '@/mocks/rest/internal/api/v1/apps/get-auth.js';

describe('GET /internal/api/v1/apps/:appKey/auth', () => {
  let currentUser, token;

  beforeEach(async () => {
    currentUser = await createUser();
    token = await createAuthTokenByUserId(currentUser.id);
  });

  it('should return the app auth info', async () => {
    const exampleApp = await App.findOneByKey('github');

    const response = await request(app)
      .get(`/internal/api/v1/apps/${exampleApp.key}/auth`)
      .set('Authorization', token)
      .expect(200);

    const expectedPayload = getAuthMock(exampleApp.auth);
    expect(response.body).toStrictEqual(expectedPayload);
  });

  it('should return not found response for invalid app key', async () => {
    await request(app)
      .get('/internal/api/v1/apps/invalid-app-key/auth')
      .set('Authorization', token)
      .expect(404);
  });
});
