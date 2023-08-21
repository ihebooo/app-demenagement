import { Module, Global } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { LocalStrategy } from './auth/local.strategy';
import { JwtStrategy } from './auth/jwt.strategy';
import { jwtConstants } from './auth/constants';

import { userController } from './admin.controller';
import { userService } from './admin.service';

import { User } from 'src/models/user.model';
import { CategoryModule } from './categorie/category.module';
import { MeubleModule } from './meubles/meuble.module';

import { ClientModule } from './client/client.module'
import { Devis } from 'src/models/devis.model';


@Module({
	imports: [
		TypeOrmModule.forFeature([User,Devis]),
		PassportModule,
		JwtModule.register({
			secret: jwtConstants.secret,
			signOptions: { expiresIn: '1h' },
		}),
		CategoryModule,
		MeubleModule,
		ClientModule
	],
	controllers: [userController],
	providers: [userService, LocalStrategy, JwtStrategy],
	exports: [userService],
})
export class AdminModule {}
