import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter'; // Import HandlebarsAdapter
import { join } from 'path'; // For path manipulation

import { ClientController } from './client.controller';
import { ClientService } from './client.service';

import { DeviItem } from 'src/models/devi_item.model';
import { Devis } from 'src/models/devis.model';
import { Adresse } from 'src/models/adresse.model';
import { Client } from 'src/models/client.model';

@Module({
  imports: [
    TypeOrmModule.forFeature([DeviItem, Devis, Adresse, Client]),
    MailerModule.forRootAsync({
      useFactory: () => ({
        transport: {
          // Set up Gmail SMTP configuration
          host: 'smtp.gmail.com', // Gmail SMTP server
          port: 587, // Port for TLS
          secure: false, // true for 465, false for other ports
          auth: {
            user: 'dem.app2023@gmail.com', // Your Gmail email
            pass: 'owngrhzsrypdlsjr            ', // Your Gmail password
          },
        },
        defaults: {
          from: '"No Reply" <dem.app2023@gmail.com>',
        },
        template: {
          dir: join(__dirname, '../../..', 'templates'), // Path to your templates directory
          adapter: new HandlebarsAdapter(), // Use Handlebars as the template engine
          options: {
            strict: true, // Enable strict mode for Handlebars
          },
        },
      }),
    }),
  ],
  controllers: [ClientController],
  providers: [ClientService],
})
export class ClientModule {}
