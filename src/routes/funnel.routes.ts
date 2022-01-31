import express from 'express';

const router = express.Router();
import funnelController from '~/controllers/funnel.controller';

router.post('/:estableshimentId', funnelController.store);
router.put('/:id/estableshiment/:estableshimentId', funnelController.update);
router.get('/:id/estableshiment/:estableshimentId', funnelController.findById);

export default router;