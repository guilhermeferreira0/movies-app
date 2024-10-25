import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { LoginAuthDto } from './dto/login-auth.dto';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService, private jwtService: JwtService) {}

  async generateTokens(userId: number, email: string) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync({userId, email}, {
        expiresIn: 60 * 60 * 24,
        secret: 'secretkeyjwt'
      }),
      this.jwtService.signAsync({userId, email}, {
        expiresIn: 60 * 1,
        secret: 'secretkeyjwt'
      }),
    ])

    return { accessToken, refreshToken };
  }

  async validateUser(loginAuthDto: LoginAuthDto) {
    const user = await this.usersService.findOne({ email: loginAuthDto.email });
    if (!user) throw new NotFoundException('Not user');
    if (user.password !== loginAuthDto.password) throw new UnauthorizedException();

    return user;
  }
  
  async loginUser(userId: number, email: string, res: Response) {
    const { accessToken, refreshToken } = await this.generateTokens(userId, email);

      res.cookie('access_token', accessToken, {
        expires: new Date(new Date().getTime()+5*60*1000), 
        httpOnly: true
      });

      return {
        data: {
          userId,
          email,
        },
        token: refreshToken,
      };
  }

  signinLocal() {}

  logout() {
    return 'LOGOUT'
  }

  refreshToken() {}
}