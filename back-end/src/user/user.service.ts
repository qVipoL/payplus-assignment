import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  findMany(params: { where?: Prisma.UserWhereInput }) {
    return this.prisma.user.findMany(params);
  }

  findFirst(params: { where: Prisma.UserWhereInput }) {
    return this.prisma.user.findFirst(params);
  }

  create(params: { data: Prisma.UserCreateInput }) {
    return this.prisma.user.create(params);
  }

  update(params: {
    where: Prisma.UserWhereUniqueInput;
    data: Prisma.UserUpdateInput;
  }) {
    return this.prisma.user.update(params);
  }

  delete(params: { where: Prisma.UserWhereUniqueInput }) {
    return this.prisma.user.delete(params);
  }
}
