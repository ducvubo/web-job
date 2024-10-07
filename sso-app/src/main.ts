import { NestFactory, Reflector } from '@nestjs/core'
import { AppModule } from './app.module'
import { join } from 'path'
import { NestExpressApplication } from '@nestjs/platform-express'
import { TransformIntercaptor } from './core/transform.interceptor'
import { ConfigService } from '@nestjs/config'
import { JwtAuthGuard } from './auth/guard/jwt-auth.guard'
import { ValidationPipe } from '@nestjs/common'

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule)
  const reflector = app.get(Reflector)
  app.useGlobalGuards(new JwtAuthGuard(reflector))

  const configService = app.get(ConfigService)
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }))
  app.useGlobalInterceptors(new TransformIntercaptor(reflector))

  app.useStaticAssets(join(__dirname, '..', 'public'))
  app.setBaseViewsDir(join(__dirname, '..', 'views'))
  app.setViewEngine('ejs')

  await app.listen(configService.get<string>('PORT'))
}
bootstrap()
