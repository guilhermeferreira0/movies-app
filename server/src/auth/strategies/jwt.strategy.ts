import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { ForbiddenException, Injectable } from "@nestjs/common";
import { Request } from "express";

  // function cookieExtractor(req: Request) {
  //   let token = null;
  //   if (req && req.cookies) {
  //     token = req.cookies['access_token']
  //   }
  //   return token;
  // }

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'secretkeyjwt'
    });
  }

  async validate(req: Request, payload: any) {
    const refreshToken = req?.get('authorization')?.replace('Bearer ', '').trim();
    if (!refreshToken) throw new ForbiddenException('Refresh token invalid');

    return {
      ...payload,
      refreshToken
    }
  }
}