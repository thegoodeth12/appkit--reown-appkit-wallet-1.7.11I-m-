import { describe, it, expect, beforeEach } from 'vitest';
import request from 'supertest';
import app from '../../../../../app.js';
import createAuthTokenByUserId from '@/helpers/create-auth-token-by-user-id.js';
import { createUser } from '@/factories/user.js';
import { createFlow } from '@/factories/flow.js';
import { createStep } from '@/factories/step.js';
import { createExecution } from '@/factories/execution.js';
import { createPermission } from '@/factories/permission.js';
import getExecutionsMock from '@/mocks/rest/internal/api/v1/executions/get-executions.js';

describe('GET /internal/api/v1/executions', () => {
  let currentUser, currentUserRole, anotherUser, token;

  beforeEach(async () => {
    currentUser = await createUser();
    currentUserRole = await currentUser.$relatedQuery('role');

    anotherUser = await createUser();

    token = await createAuthTokenByUserId(currentUser.id);
  });

  it('should return the executions of current user', async () => {
    const currentUserFlow = await createFlow({
      userId: currentUser.id,
    });

    const stepOne = await createStep({
      flowId: currentUserFlow.id,
      type: 'trigger',
    });

    const stepTwo = await createStep({
      flowId: currentUserFlow.id,
      type: 'action',
    });

    const currentUserExecutionOne = await createExecution({
      flowId: currentUserFlow.id,
    });

    const currentUserExecutionTwo = await createExecution({
      flowId: currentUserFlow.id,
    });

    await currentUserExecutionTwo
      .$query()
      .patchAndFetch({ deletedAt: new Date().toISOString() });

    await createPermission({
      action: 'read',
      subject: 'Execution',
      roleId: currentUserRole.id,
      conditions: ['isCreator'],
    });

    const response = await request(app)
      .get('/internal/api/v1/executions')
      .set('Authorization', token)
      .expect(200);

    const expectedPayload = await getExecutionsMock(
      [currentUserExecutionTwo, currentUserExecutionOne],
      currentUserFlow,
      [stepOne, stepTwo]
    );

    expect(response.body).toStrictEqual(expectedPayload);
  });

  it('should return the executions of another user', async () => {
    const anotherUserFlow = await createFlow({
      userId: anotherUser.id,
    });

    const stepOne = await createStep({
      flowId: anotherUserFlow.id,
      type: 'trigger',
    });

    const stepTwo = await createStep({
      flowId: anotherUserFlow.id,
      type: 'action',
    });

    const anotherUserExecutionOne = await createExecution({
      flowId: anotherUserFlow.id,
    });

    const anotherUserExecutionTwo = await createExecution({
      flowId: anotherUserFlow.id,
    });

    await anotherUserExecutionTwo
      .$query()
      .patchAndFetch({ deletedAt: new Date().toISOString() });

    await createPermission({
      action: 'read',
      subject: 'Execution',
      roleId: currentUserRole.id,
      conditions: [],
    });

    const response = await request(app)
      .get('/internal/api/v1/executions')
      .set('Authorization', token)
      .expect(200);

    const expectedPayload = await getExecutionsMock(
      [anotherUserExecutionTwo, anotherUserExecutionOne],
      anotherUserFlow,
      [stepOne, stepTwo]
    );

    expect(response.body).toStrictEqual(expectedPayload);
  });
});
