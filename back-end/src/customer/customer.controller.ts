import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { Auth } from 'src/auth/auth.decorator';
import { CustomerService } from './customer.service';
import { CreateCustomerDto } from './dto/create-customer.dto';

@Auth()
@Controller('customer')
export class CustomerController {
  constructor(private customerService: CustomerService) {}

  @Get()
  findAll(@Req() req) {
    const userId = req?.user?.id;

    if (!userId) throw new UnauthorizedException();

    return this.customerService.findMany({
      where: {
        userId,
      },
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Req() req) {
    const userId = req?.user?.id;

    if (!userId) throw new UnauthorizedException();

    return this.customerService.findFirst({
      where: {
        id,
        userId,
      },
    });
  }

  @Post()
  create(@Body() createCustomerDto: CreateCustomerDto, @Req() req) {
    const userId = req?.user?.id;

    const { birthday, email, fullName, phoneNumber } = createCustomerDto;

    if (!userId) throw new UnauthorizedException();

    return this.customerService.create({
      data: {
        email,
        fullName,
        phoneNumber,
        birthday,
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });
  }
}
