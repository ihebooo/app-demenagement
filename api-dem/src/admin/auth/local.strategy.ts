import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { userService } from '../admin.service';
import { UserRoles } from './user-roles.enum';
import { unauthorized } from 'src/exceptions/http-exception';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: userService) {
    super({
      passReqToCallback: true,
    });
  }

  async validate(
    req: Request,
    username: string,
    password: string,
  ): Promise<any> {
    const { status, error, user } = await this.userService.validateUser(
      username,
      password,
    );
    if (status === false) {
      throw new unauthorized(error);
    }

    const userRoleValues = Object.values(UserRoles);
    if (!userRoleValues.includes(user.role)) {
      throw new unauthorized('Invalid user role');
    }


    return user;
  }
}
