import {
	UseInterceptors,
	Body,
	Controller,
	Get,
	Req,
	Query,
	Param,
	ParseIntPipe,
	Post,
	UsePipes,
	Request,
	UseGuards,
	ValidationPipe,
	SetMetadata,
	NotFoundException,
} from '@nestjs/common';
import { userService } from './admin.service';
import { CustomValidation } from 'src/decorators/custom-validator.decorator';
import { RequestHeaders } from 'src/decorators/request-header.decorator';

/*** auth ***/

import { RolesGuard } from './auth/roles.guard';
import { HasRoles } from './auth/has-roles.decorator';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { UserRoles } from './auth/user-roles.enum';

/***** dtos ****/
import {
	} from 'src/dtos/common.dto';

@Controller('admin')
@UsePipes(CustomValidation)
export class userController {
	constructor(private readonly userService: userService) {}

	@Get()
	getHello(): string {
		return 'api déménagement v1.0';
	}



	@UseGuards(LocalAuthGuard)
	@Post('login')
	async login(
		@Request() req,
	): Promise<any> {

		return await this.userService.login(req.user);
	}

	@UseGuards(JwtAuthGuard, RolesGuard)
	@HasRoles(
		UserRoles.Admin,
		
	)
	@Get('get-me')
	async getProfile(@Request() req): Promise<any> {
		let logged_user = req.user;
		return await this.userService.findUserById(logged_user);
	}


	@UseGuards(JwtAuthGuard, RolesGuard)
	@HasRoles(
		UserRoles.Admin,
		
	)
	@Get('devis')
	async getDevis(): Promise<any> {
		return await this.userService.getDevis();
	}

	/** catgories */


	/** catgories */


	/** meubbles */

	/** meubbles */

}
