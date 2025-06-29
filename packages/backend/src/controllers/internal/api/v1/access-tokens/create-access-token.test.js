import { describe, it, expect, beforeEach } from 'vitest';
import request from 'supertest';
import app from '../../../../../app.js';
import { createUser } from '@/factories/user.js';

describe('POST /internal/api/v1/access-tokens', () => {
  beforeEach(async () => {
    await createUser({
      email: 'user@automatisch.io',
      password: 'password',
    });
  });

  it('should return the token data with correct credentials', async () => {
    const response = await request(app)
      .post('/internal/api/v1/access-tokens')
      .send({
        email: 'user@automatisch.io',
        password: 'password',
      })
      .expect(200);

    expect(response.body.data.token.length).toBeGreaterThan(0);
  });

  it('should return error with incorrect credentials', async () => {
    const response = await request(app)
      .post('/internal/api/v1/access-tokens')
      .send({
        email: 'incorrect@email.com',
        password: 'incorrectpassword',
      })
      .expect(422);

    expect(response.body.errors.general).toStrictEqual([
      'Incorrect email or password.',
    ]);
  });
});
