import prisma from '../prisma';
import * as z from 'zod';
import AppError from '../../exceptions/appError.exception';
import { StatusCode } from '~/helpers';
import parseZodErrors from '~/helpers/parseZodErrors'; 

import { createFunnelValidation, createFunnelMessageValidation } from '../../validations'; 
import { Funnel, Behavior, FunnelMessage } from '@prisma/client';
 
export const createFunnelService = async (data: Funnel, messages: FunnelMessage[]) => {
  try { 
    if(messages.length < 3) {
      throw new AppError(['FUNNEL_MESSAGES_MINIMUN_3'], StatusCode.BAD_REQUEST);
    }

    const payload = createFunnelValidation.parse(data); 
    const payloadMessages = createFunnelMessageValidation.parse(messages);
    
    console.log('PAYLOAD MESSAGES', payloadMessages);
    const { name, estableshimentId, behavior, departmentToRedirect } = payload;

    if(behavior === Behavior.REDIRECT && !departmentToRedirect) throw new AppError(['DEPARTMENT_TO_REDIRECT_REQUIRED'], StatusCode.BAD_REQUEST);
    if(behavior === Behavior.FINISH) payload.departmentToRedirect = undefined;

    const find = await prisma.funnel.findFirst({
      where: {
        name,
        estableshimentId,
      }
    });

    if(find) throw new AppError(['FUNNEL_NAME_ALREADY_EXIST'], StatusCode.BAD_REQUEST);

    const funnel = await prisma.funnel.create({
      data: {
        ...payload,
      }
    });

    messages.forEach((el) => { 
      el.funnelId = funnel.id
    });

    
    await prisma.funnelMessage.createMany({
      data: messages,
    });

    const resultMessages = await prisma.funnelMessage.findMany({
      where: {
        funnelId: funnel.id,
      }
    });

    return {
      funnel,
      messages: resultMessages,
    };

  } catch (error: any) {
    if (error instanceof z.ZodError) {
      throw new AppError(parseZodErrors(error), StatusCode.BAD_REQUEST);
    }
    if (error instanceof AppError) {
      throw new AppError(error.messages, error.statusCode);
    }
    throw new AppError(error?.message, StatusCode.INTERNAL_SERVER_ERROR);
  }
};