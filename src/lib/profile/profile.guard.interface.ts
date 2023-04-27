import { CanActivate } from '@nestjs/common';

export type IProfileGuard = CanActivate;

export const IProfileGuardConstant = 'IProfileGuard';
