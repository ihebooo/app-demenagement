import 'dotenv/config';

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CustomExceptionFilter } from 'src/exceptions/custom-exception.filter';

async function bootstrap() {
  const port = process.env.PORT || 3000;

  const app = await NestFactory.create(AppModule);

  app.useGlobalFilters(new CustomExceptionFilter());

  app.enableCors({
    //origin: ['http://localhost:3000', 'https://forzza.win'],
    methods: ['POST', 'GET'],
    credentials: true,
  });

  await app.listen(port).then(() => {
    console.log(`app listen on port : ${port} `);
  });
}
bootstrap();