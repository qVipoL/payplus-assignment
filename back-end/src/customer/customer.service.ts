import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CustomerService {
  constructor(private readonly prisma: PrismaService) {}

  findMany(params: { where?: Prisma.CustomerWhereInput }) {
    return this.prisma.customer.findMany(params);
  }

  findFirst(params: { where: Prisma.CustomerWhereInput }) {
    return this.prisma.customer.findFirst(params);
  }

  create(params: { data: Prisma.CustomerCreateInput }) {
    return this.prisma.customer.create(params);
  }
}
