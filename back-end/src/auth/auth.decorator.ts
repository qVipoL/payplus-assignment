import { UseGuards, applyDecorators } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtGuard } from './jwt/jwt.guard';

// Combines JWT guard and swagger api doc
export function Auth() {
  return applyDecorators(UseGuards(JwtGuard), ApiBearerAuth());
}
