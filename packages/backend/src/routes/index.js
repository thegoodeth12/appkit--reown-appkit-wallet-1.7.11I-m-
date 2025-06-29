import { Router } from 'express';
import webhooksRouter from '@/routes/webhooks.js';
import paddleRouter from '@/routes/paddle.ee.js';
import healthcheckRouter from '@/routes/healthcheck.js';
import apiRouter from '@/routes/api/index.js';
import internalApiRouter from '@/routes/internal/api/index.js';
import { checkIsEnterprise } from '@/helpers/check-is-enterprise.js';
import { authenticateApiToken } from '@/helpers/authenticate-api-token.ee.js';

const router = Router();

router.use('/webhooks', webhooksRouter);
router.use('/paddle', paddleRouter);
router.use('/healthcheck', healthcheckRouter);
router.use('/api', checkIsEnterprise, authenticateApiToken, apiRouter);
router.use('/internal/api', internalApiRouter);

export default router;
