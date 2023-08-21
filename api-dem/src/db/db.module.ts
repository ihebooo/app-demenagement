import { Module, Global } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { User } from 'src/models/user.model';
import { Adresse } from 'src/models/adresse.model';
import { Category } from 'src/models/categorie.model';
import { Client } from 'src/models/client.model';
import { DeviItem } from 'src/models/devi_item.model';
import { Devis } from 'src/models/devis.model';
import { Meuble } from 'src/models/meuble.model';
@Global()
@Module({
	imports: [
		TypeOrmModule.forRootAsync({
			imports: [ConfigModule],
			useFactory: (configService: ConfigService) => ({
				type: 'mysql',
				host: configService.get('DB_HOST'),
				port: configService.get('DB_PORT'),
				username: configService.get('DB_USER'),
				password: configService.get('DB_PASSWORD'),
				database: configService.get('DB_DATABASE'),
				entities: [User,Adresse,Category,Client,DeviItem,Devis,Meuble],
				synchronize: true,
			}),
	
			inject: [ConfigService],
		}),
	],
	providers: [],
	exports: [],
})
export class DbModule {}
