import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({ origin: '*' });
  // const graphQLUp = await graphqlUploadExpress({ maxFileSize: 1000000, maxFiles: 10 })
  const graphqlUploadExpress = (
    await import('graphql-upload/graphqlUploadExpress.mjs')
  ).default;
  app.use(graphqlUploadExpress({ maxFileSize: 1000000, maxFiles: 10 }));
  await app.listen(3000);
}
bootstrap();
