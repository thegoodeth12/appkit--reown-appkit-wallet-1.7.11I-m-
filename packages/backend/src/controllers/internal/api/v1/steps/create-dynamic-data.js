import { renderObject } from '@/helpers/renderer.js';

export default async (request, response) => {
  const step = await request.currentUser.authorizedSteps
    .clone()
    .where('steps.id', request.params.stepId)
    .whereNotNull('steps.app_key')
    .first()
    .throwIfNotFound();

  const dynamicData = await step.createDynamicData(
    request.body.dynamicDataKey,
    request.body.parameters,
    request.currentUser
  );

  renderObject(response, dynamicData);
};
