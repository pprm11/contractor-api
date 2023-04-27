import { OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

export interface IPrismaService extends OnModuleInit, PrismaClient {}

export const IPrismaServiceConstant = 'IPrismaService';
