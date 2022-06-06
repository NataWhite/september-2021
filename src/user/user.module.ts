import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaService } from '../core/prisma.service';

@Module({
  providers: [UserService, PrismaService],
  imports: [],
  controllers: [UserController],
})
export class UserModule {}
