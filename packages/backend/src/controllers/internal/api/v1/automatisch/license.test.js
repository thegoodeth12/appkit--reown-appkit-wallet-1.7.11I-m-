import { vi, expect, describe, it } from 'vitest';
import request from 'supertest';
import app from '../../../../../app.js';
import licenseMock from '@/mocks/rest/internal/api/v1/automatisch/license.js';
import * as license from '@/helpers/license.ee.js';

describe('GET /internal/api/v1/automatisch/license', () => {
  it('should return Automatisch license info', async () => {
    vi.spyOn(license, 'getLicense').mockResolvedValue({
      id: '123',
      name: 'license-name',
      expireAt: '2025-12-31T23:59:59Z',
    });

    const response = await request(app)
      .get('/internal/api/v1/automatisch/license')
      .expect(200);

    const expectedPayload = licenseMock();

    expect(response.body).toStrictEqual(expectedPayload);
  });
});
