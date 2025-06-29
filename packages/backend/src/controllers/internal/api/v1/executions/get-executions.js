import { renderObject } from '@/helpers/renderer.js';
import paginateRest from '@/helpers/pagination.js';

export default async (request, response) => {
  const executionsQuery = request.currentUser.getExecutions(
    executionParams(request)
  );

  const executions = await paginateRest(executionsQuery, request.query.page);

  renderObject(response, executions);
};

const executionParams = (request) => {
  return {
    name: request.query.name,
    status: request.query.status,
    startDateTime: request.query.startDateTime,
    endDateTime: request.query.endDateTime,
  };
};
