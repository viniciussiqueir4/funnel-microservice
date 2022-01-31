import prisma from '../prisma';
import * as z from 'zod';
import AppError from '../../exceptions/appError.exception';
import { StatusCode } from '~/helpers';
import parseZodErrors from '~/helpers/parseZodErrors';

export const getFunnelByIdService = async (id: string, estableshimentId: number) => {
  try {
    const funnel = await prisma.funnel.findFirst({
      where: {
        id,
        estableshimentId,
      },
      include: {
        funnelMessages: true,
      }
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