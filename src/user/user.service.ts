import { Injectable } from '@nestjs/common';
import { Post, Prisma, User } from '@prisma/client';
import { PrismaService } from '../core/prisma.service';

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}

  getAllUsers(): Promise<User[]> {
    return this.prismaService.user.findMany();
  }

  getOneById(userId: string): Promise<User> {
    return this.prismaService.user.findUnique({
      where: { id: Number(userId) },
      include: { posts: true },
    });
  }

  getUserByEmail(userEmail: string): Promise<User> {
    return this.prismaService.user.findFirst({
      where: { email: userEmail },
    });
  }

  createUser(data: Prisma.UserCreateInput): Promise<User> {
    return this.prismaService.user.create({ data });
  }

  updateUser(userData: Prisma.UserUpdateInput, userId: string): Promise<User> {
    return this.prismaService.user.update({
      where: { id: Number(userId) },
      data: { name: userData.name, age: userData.age, avatar: userData.avatar },
    });
  }
}

