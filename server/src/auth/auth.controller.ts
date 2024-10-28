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
  async signupLocal(@Request() req: any, @Response() res: any) {
    const user = await this.authService.loginUser(req.user.id, req.user.email, res);
    return res.json(user);
  }

  @Get('/signin')
  @HttpCode(HttpStatus.OK)
  signinLocal() {
    return this.authService.signinLocal();
  }

  @UseGuards(JwtAuthGuard)
  @Get('/logout')
  @HttpCode(HttpStatus.OK)
  logout(@Request() req: any, @Response() res: any) {
    return this.authService.logout(req ,res);
  }

  @Get('/refresh')
  @HttpCode(HttpStatus.CREATED)
  refreshToken(@Request() req: any) {
    const refreshToken = req.cookies['refresh_token'];
    return this.authService.refreshAccessToken(refreshToken);
  }
}
