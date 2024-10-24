import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const PORT = process.env.PORT || 3000;
  const MODE = process.env.NODE_ENV;
  
  await app.listen(PORT, () => {
    console.log(`Running API in MODE : ${MODE} on PORT: ${PORT}`)
  });
}
bootstrap();
