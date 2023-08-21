import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository, Between } from 'typeorm';
import { User, getRoleFromString } from 'src/models/user.model';

import { unauthorized } from 'src/exceptions/http-exception';

import { JwtService } from '@nestjs/jwt';

import { hash, verify, generateRandomDigits } from 'src/utils/crypt';
import { isEmpty, capitalizeSentence } from 'src/utils/global';
import { parse as parseDate, startOfDay, endOfDay } from 'date-fns';
import { Devis } from 'src/models/devis.model';

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
	) {}

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

	async login(user: any) {
		const expiresIn = '5h';

		const payload = {
			id: parseInt(user.id),
			username: user.username,
			role: user.role,
		};

		return {

			...user,
			token: this.jwtService.sign(payload, { expiresIn }),
		};
	}

	async getDevis() : Promise<any> {


		return this.devisModel.find({

			relations : ["client", "adr_dep", "adr_arr", "devis_items", "devis_items.meuble_id"]


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
				role: true,
			},
		});

		if (isEmpty(user)) {
			throw new unauthorized('not logged in');
		}


		return user;
	}
}
