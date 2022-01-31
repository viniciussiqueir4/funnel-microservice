import prisma from '../prisma';
import * as z from 'zod';
import AppError from '../../exceptions/appError.exception';
import { StatusCode } from '~/helpers';
import parseZodErrors from '~/helpers/parseZodErrors';
import { updateFunnelValidation } from '../../validations'; 
import { Funnel, Behavior } from '@prisma/client';

export const updateFunnelService = async (data: Funnel) => {
  try {
    const payload = updateFunnelValidation.parse(data);
    
    const { id, name, behavior, estableshimentId, departmentToRedirect } = payload;

    if(behavior === Behavior.REDIRECT && !departmentToRedirect) throw new AppError(['DEPARTMENT_TO_REDIRECT_REQUIRED'], StatusCode.BAD_REQUEST);

    if(behavior === Behavior.FINISH) { 
      payload.departmentToRedirect = 0;
    };

    const match = await prisma.funnel.findFirst({
      where: {
        id,
        estableshimentId,
      }
    }); 
    
    if(!match) throw new AppError(['ESTABLESHIMENT_NOT_MATCH'], StatusCode.BAD_REQUEST);
    
    const find = await prisma.funnel.findFirst({
      where: {
        estableshimentId,
        name,
        id: {
          not: id,
        }
      }
    });

    if(find) throw new AppError(['FUNNEL_NAME_ALREADY_EXIST'], StatusCode.BAD_REQUEST);
 
    const funnel = await prisma.funnel.update({
      where: {
        id,
      },
      data: {
        ...payload,  
      },
    });

    return funnel;

  } catch(error: any) {
    if (error instanceof z.ZodError) {
      throw new AppError(parseZodErrors(error), StatusCode.BAD_REQUEST);
    }
    if (error instanceof AppError) {
      throw new AppError(error.messages, error.statusCode);
    }
    throw new AppError(error?.message, StatusCode.INTERNAL_SERVER_ERROR);
  }
}