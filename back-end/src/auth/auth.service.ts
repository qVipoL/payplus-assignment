import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from './dto/register.dto';
import { User } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  // Checks validity of an israeli ID number
  private validateIdNumber(idNumber: string) {
    if (!/^\d{9}$/.test(idNumber)) {
      return false;
    }

    let sum = 0;
    for (let i = 0; i < 9; i++) {
      let digit = parseInt(idNumber.charAt(i), 10);

      if (i % 2 === 1) {
        digit *= 2;
        if (digit > 9) {
          digit = (digit % 10) + Math.floor(digit / 10);
        }
      }

      sum += digit;
    }

    return sum % 10 === 0;
  }

  // Generates JWT token from user object
  private generateAccessToken(user: User) {
    const payload = { sub: user.id, email: user.email };

    return {
      accessToken: this.jwtService.sign(payload),
    };
  }

  async login(loginDto: LoginDto) {
    const { idNumber, password } = loginDto;

    const user = await this.userService.findFirst({
      where: { idNumber },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return this.generateAccessToken(user);
  }

  async register(registerDto: RegisterDto) {
    const { email, password, confirmPassword, fullName, idNumber } =
      registerDto;

    if (password !== confirmPassword) {
      throw new BadRequestException('Passwords do not match');
    }

    if (!this.validateIdNumber(idNumber)) {
      throw new BadRequestException('Invalid ID number');
    }

    const existingUser = await this.userService.findFirst({
      where: { email },
    });

    if (existingUser) {
      throw new BadRequestException('User already exists');
    }

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await this.userService.create({
      data: { email, password: hashedPassword, fullName, idNumber },
    });

    return this.generateAccessToken(user);
  }
}
