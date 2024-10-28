import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { LoginAuthDto } from './dto/login-auth.dto';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService, private jwtService: JwtService) {}

  private async generateTokens(userId: number, email: string) {
    const [refreshToken, accessToken] = await Promise.all([
      this.jwtService.signAsync({userId, email}, {
        expiresIn: 60 * 60 * 24,
        secret: process.env.JWT_SECRET || 'secret',
      }),
      this.jwtService.signAsync({userId, email}, {
        expiresIn: 60 * 60 * 2,
        secret: process.env.JWT_SECRET || 'secret' 
      }),
    ])

    return { refreshToken, accessToken };
  }

  async validateUser(loginAuthDto: LoginAuthDto) {
    const user = await this.usersService.findOne({ email: loginAuthDto.email });
    if (!user) throw new NotFoundException('Not user');
    if (user.password !== loginAuthDto.password) throw new UnauthorizedException();

    return user;
  }
  
  async loginUser(userId: number, email: string, res: Response) {
    const { refreshToken, accessToken } = await this.generateTokens(userId, email);

      // Setting cookie httponly
      res.cookie('refresh_token', refreshToken, {
        expires: new Date(new Date().getTime()+5*60*1000), 
        httpOnly: true,
        secure: process.env.NODE_ENV == 'production',
      });

      return {
        data: {
          userId,
          email,
        },
        accessToken: accessToken,
      };
  }

  signinLocal() {}

  logout(req: Request, res: Response) {
    res.clearCookie('access_token');
    res.clearCookie('refresh_token');

    return res.json({
      message: 'successfully',
      successfull: true,
    });
  }

  async refreshAccessToken(refreshToken: string) {
    try {
      const payload = this.jwtService.verify(refreshToken, {
        secret: process.env.JWT_SECRET || 'secret',
      });

      const newAccessToken = this.jwtService.sign({ userId: payload.userId, email: payload.email }, {
        secret: process.env.JWT_SECRET || 'secret',
      });

      return { 
        accessToken: newAccessToken,
      }
    } catch (error) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }
}