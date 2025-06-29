import Step from '@/models/step.js';
import { createFlow } from '@/factories/flow.js';

export const createStep = async (params = {}) => {
  params.flowId = params?.flowId || (await createFlow()).id;
  params.type = params?.type || 'action';

  const lastStep = await Step.query()
    .where('flow_id', params.flowId)
    .andWhere('deleted_at', null)
    .orderBy('position', 'desc')
    .limit(1)
    .first();

  params.position =
    params?.position || (lastStep?.position ? lastStep.position + 1 : 1);

  params.status = params?.status || 'completed';

  if (params.appKey !== null) {
    params.appKey =
      params?.appKey || (params.type === 'action' ? 'deepl' : 'webhook');
  }

  params.parameters = params?.parameters || {};

  const step = await Step.query().insertAndFetch(params);

  return step;
};
