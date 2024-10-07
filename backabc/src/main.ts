import { NestFactory, Reflector } from '@nestjs/core'
import { AppModule } from './app.module'
import { join } from 'path'
import { NestExpressApplication } from '@nestjs/platform-express'
import { TransformIntercaptor } from './core/transform.interceptor'
import { ConfigService } from '@nestjs/config'
import { ValidationPipe, VersioningType } from '@nestjs/common'
import { initRedis } from './init/init.redis'
import * as bodyParser from 'body-parser'
import { connectQueueCompany, ConnectQueueJob } from './utils/rabbitmq.check'
// import { AllExceptionsFilter } from './filter/global.filter'
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule)

  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: true }))
  const reflector = app.get(Reflector)

  connectQueueCompany()
  ConnectQueueJob()

  const configService = app.get(ConfigService)
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }))
  app.useGlobalInterceptors(new TransformIntercaptor(reflector))
  app.useStaticAssets(join(__dirname, '..', 'public'))
  app.setBaseViewsDir(join(__dirname, '..', 'views'))
  app.setViewEngine('ejs')
  // app.enableCors({
  //   origin: 'http://localhost:3000',
  //   methods: 'GET, HEAD, PUT, PATCH, POST, DELETE',
  //   preflightContinue: false,
  //   credentials: true
  // })
  app.enableCors()
  initRedis()

  app.setGlobalPrefix('api')
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: ['1', '2']
  })

  // app.useGlobalFilters(new AllExceptionsFilter())
  await app.listen(configService.get<string>('PORT'))
}
bootstrap()
