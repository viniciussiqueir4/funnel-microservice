import prisma from '../prisma';
import * as z from 'zod';
import AppError from '../../exceptions/appError.exception';
import { StatusCode } from '~/helpers';
import parseZodErrors from '~/helpers/parseZodErrors';
import { FunnelMessage } from '@prisma/client';


export const createMessageService = async (data: FunnelMessage[]) => {
  try {
    console.log(data);
    const messages = await prisma.funnelMessage.createMany({
      data,
    });

    return messages;
  
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