import { generateWorker } from '@/workers/worker.js';
import { executeActionJob } from '@/jobs/execute-action.js';

const actionWorker = generateWorker('action', executeActionJob);

export default actionWorker;
