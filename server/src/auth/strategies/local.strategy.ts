import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService } from "../auth.service";
import { Injectable } from "@nestjs/common";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'email',
    });
  }
  
  async validate(email: string, password: string) {
    const user = await this.authService.validateUser({ email, password });
    if (user instanceof Error) return user.message;
    
    return user;
    // const refreshToken = req?.get('authorization')?.replace('Bearer', '').trim();

    // if (!refreshToken) throw new ForbiddenException('Refresh Token');

    // return { refreshToken }
  }
}