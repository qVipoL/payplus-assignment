import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserService } from 'src/user/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly userService: UserService,
    private readonly configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get('JWT_SECRET', 'secret'),
    });
  }

  async validate(payload: { sub: string; username: string }) {
    const { sub } = payload;

    const user = await this.userService.findFirst({ where: { id: sub } });

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
