import { Request, Response } from 'express';
import { createFunnelService, updateFunnelService, getFunnelByIdService } from '~/services/funnel'; 
import { presenter, StatusCode } from '~/helpers';

const funnelController = (() => {
  const store = async (req: Request, res: Response) => { 
    try {
      const { estableshimentId } = req.params; 
      const { messages } = req.body;
      const funnel = {
        ...req.body.funnel,
        estableshimentId: Number(estableshimentId),
      }; 
      const result = await createFunnelService(funnel, messages);

      return res.status(StatusCode.OK).json(presenter(result, ['SUCCESS'], true));
    } catch(err: any) {
      return res.status(err.statusCode).json(err);
    }
  };

  const update = async(req: Request, res: Response) => {
    try {
      const { id, estableshimentId } = req.params;

      const funnel = {
        id,
        ...req.body,
        estableshimentId: Number(estableshimentId),
      }; 
      const result = await updateFunnelService(funnel);

      return res.status(StatusCode.OK).json(presenter(result, ['SUCCESS'], true));
    } catch(err: any) {
      return res.status(err.statusCode).json(err);
    }
  }

  const findById = async(req: Request, res: Response) => {
    try {
      const { id, estableshimentId } = req.params;

      const result = await getFunnelByIdService(id, Number(estableshimentId));

      return res.status(StatusCode.OK).json(presenter(result, ['SUCCESS'], true));
    } catch(err: any) {
      return res.status(err.statusCode).json(err); 
    }
  }
  
  return {
    store,
    update,
    findById,
  };
})();

export default funnelController;