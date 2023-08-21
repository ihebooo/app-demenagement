import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { unauthorized } from 'src/exceptions/http-exception';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
	handleRequest(err: any, user: any, info: any) {
		// If there's an error or user is not found, throw UnauthorizedException with custom message
		if (err || !user) {
			throw new unauthorized('unauthorized');
		}

		return user;
	}
}
