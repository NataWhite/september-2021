import { forwardRef, Module } from "@nestjs/common";
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaService } from '../core/prisma.service';
import { AuthModule } from "../auth/auth.module";
import { JwtService } from "@nestjs/jwt";

@Module({
  providers: [UserService, PrismaService, JwtService],
  imports: [
    forwardRef(() =>(AuthModule))],
  controllers: [UserController],
})
export class UserModule {}
