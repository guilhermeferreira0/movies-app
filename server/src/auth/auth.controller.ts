import { Controller, Get, Post, HttpCode, HttpStatus, UseGuards, Request, Response } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local.auth.guard';
import { JwtAuthGuard } from './jwt.auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('/signup')
  @HttpCode(HttpStatus.CREATED)
  async signupLocal(@Request() req, @Response() res) {
    const user = await this.authService.loginUser(req.user.id, req.user.email, res);
    console.log(user);
    return { message: 'a' };
  }

  @Get('/signin')
  @HttpCode(HttpStatus.OK)
  signinLocal() {
    return this.authService.signinLocal();
  }

  @UseGuards(JwtAuthGuard)
  @Get('/logout')
  @HttpCode(HttpStatus.OK)
  logout(@Request() req: Request) {
    return this.authService.logout();
  }

  @Post('/refresh')
  refreshToken() {
    return this.authService.refreshToken();
  }
}
