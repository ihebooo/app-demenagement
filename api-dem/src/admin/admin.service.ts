import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository, Between } from 'typeorm';
import { User, getRoleFromString } from 'src/models/user.model';

import { unauthorized } from 'src/exceptions/http-exception';

import { JwtService } from '@nestjs/jwt';

import { hash, verify, generateRandomDigits, uuid } from 'src/utils/crypt';
import { isEmpty, generateRandomDigit,maskEmail, capitalizeSentence } from 'src/utils/global';
import { parse as parseDate, startOfDay, endOfDay } from 'date-fns';
import { Devis } from 'src/models/devis.model';
import { MailerService } from '@nestjs-modules/mailer';

/***** dtos ****/

@Injectable()
export class userService {
	constructor(
		private jwtService: JwtService,
		@InjectRepository(User)
		private readonly userModel: Repository<User>,
		@InjectRepository(Devis)
		private readonly devisModel: Repository<Devis>,

		private dataSource: DataSource,
		private readonly mailerService: MailerService

	) {}

	async sendCode(code: string, email: string): Promise<void> {
		await this.mailerService.sendMail({
		  to: email,
		  subject: `2fa login for ${email}`,
		  template: './code2f', // Path to your template file
		  context: { code : code },  // Variables to use in the template
		});
	  }
	
	async validateUser(
		username: string,
		pass: string,
	): Promise<any> {
		const user = await this.findByUsernameAndOrg(username);

		if (!user) {
			return {
				status: false,
				error: "Nom d'utilisateur erroné",
			};
		}

		const isPasswordValid = await verify(pass, user.password);

		if (!isPasswordValid) {
			return {
				status: false,
				error: "mot de passe erroné",
			};
		}




		const { password, ...result } = user;

		return { status: true, error: '', user: result };
	}

	async verifCode2fa(token_2fa: string, code : string){

		console.log({token_2fa})
		let user = await this.userModel.findOne({
			where: { token_2fa: token_2fa },
			select: {
				id: true,
				username: true,
				email: true,
				code2f :true,
				token_2fa: true,
				role: true,
			},
		});


		if (!user) {


			throw new unauthorized('utilisateur not found');

		}


		if(code === user.code2f){


			const expiresIn = '5h';

			const payload = {
				id: user.id,
				username: user.username,
				role: user.role,
			};

			return {

				...user,
				token: this.jwtService.sign(payload, { expiresIn }),
			};

		}else{


		
			throw new unauthorized('code 2fa est erroné');

		}




	}


	async login(user: any) {


		/**** logic 2fa  */

		let code2fa  = generateRandomDigit(6).toString();

		
		let id = user.id;
		let token_2fa=uuid()
		await this.userModel.update(id, {code2f:code2fa, token_2fa :token_2fa} );



		/****  Send the 2FA code to the user mail */



		await this.sendCode(code2fa, user.email);

		
		return {status : true, email : maskEmail(user.email), token_2fa : token_2fa}





		/**** logic 2fa  */

		/*const expiresIn = '5h';
		const payload = {
			id: parseInt(user.id),
			username: user.username,
			role: user.role,
		};

		return {

			...user,
			token: this.jwtService.sign(payload, { expiresIn }),
		};*/
	}

	async getDevis() : Promise<any> {


		return this.devisModel.find({

			relations : ["client", "adr_dep", "adr_arr", "devis_items", "devis_items.meuble_id"],
			order: {
				created_at: 'DESC', // Sort by the created_at column in descending order
			  },
			

		})

	}

	/*******/

	async findByUsernameAndOrg(
		username: string,
	): Promise<User> {
		return await this.userModel.findOne({
			where: { username: username },
			select: {
				id: true,
				username: true,
				password: true,
				email: true,
				code2f :true,
				token_2fa:true,
				role: true,
			},
		});
	}

	async findUserById(logged_user: any): Promise<any> {
		let user = await this.userModel.findOne({
			where: {
				id: logged_user.id,
			},
			select: {
				id : true,
				username: true,
				email: true,
				role: true,
			},
		});

		if (isEmpty(user)) {
			throw new unauthorized('not logged in');
		}


		return user;
	}
}


