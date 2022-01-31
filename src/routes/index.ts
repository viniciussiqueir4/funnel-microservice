import express from 'express';

const router = express.Router();
import funnelRoutes from './funnel.routes';

router.use('/funnels', funnelRoutes);

export default router;