import {
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import {
  IPrismaService,
  IPrismaServiceConstant,
} from '../../lib/prisma/prisma.service.interface';

@Injectable()
export class ProfileGuard {
  constructor(@Inject(IPrismaServiceConstant) private prisma: IPrismaService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // To-do use token instead of id for better security
    const request = context.switchToHttp().getRequest();
    const profileId = this.extractProfileIdFromHeader(request);
    if (!profileId) {
      throw new UnauthorizedException();
    }
    try {
      const payload = await this.prisma.profile.findUnique({
        where: { id: profileId },
      });
      if (!payload) {
        throw new UnauthorizedException();
      }
      request['authProfile'] = payload;
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }

  private extractProfileIdFromHeader(request: Request): number | undefined {
    const profileId = request.headers['profile-id'] as string;
    return Number(profileId);
  }
}
