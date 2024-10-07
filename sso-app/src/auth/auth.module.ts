import { Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { UserModule } from '../user/user.module'
import { PassportModule } from '@nestjs/passport'
import { AuthController } from './auth.controller'
import { JwtModule } from '@nestjs/jwt'
import { MongooseModule } from '@nestjs/mongoose'
import { RefreshToken, RefreshTokenSchema } from './schema/refreshToken.schema'
import { JwtRefreshTokenStrategy } from './strategy/refreshToken.strategy'
import { ApiKeyModule } from 'src/api-key/api-key.module'
import { LocalStrategy } from './strategy/local.strategy'
import { JwtStrategy } from './strategy/accessToken.strategy'
import { GoogleStrategy } from './strategy/google.strategy'
import { GithubStrategy } from './strategy/github.strategy'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { ClientProxyFactory, Transport } from '@nestjs/microservices'
import { BlackListToken, BlackListTokenSchema } from './schema/blackList.schema'

@Module({
  imports: [
    UserModule,
    ApiKeyModule,
    PassportModule,
    JwtModule.register({}),
    ConfigModule,
    MongooseModule.forFeature([{ name: RefreshToken.name, schema: RefreshTokenSchema }], 'sso_master'),
    MongooseModule.forFeature([{ name: RefreshToken.name, schema: RefreshTokenSchema }], 'sso_slave'),
    MongooseModule.forFeature([{ name: BlackListToken.name, schema: BlackListTokenSchema }], 'sso_master'),
    MongooseModule.forFeature([{ name: BlackListToken.name, schema: BlackListTokenSchema }], 'sso_slave')
    // ClientsModule.register([
    //   {
    //     name: 'SUBSCRIBER_SERVICE',
    //     transport: Transport.RMQ,
    //     options: {
    //       urls: [`amqp://guest:guest@localhost`],
    //       queue: 'sendEmailQueueProcess',
    //       queueOptions: {
    //         durable: true,
    //         exclusive: false,
    //         exChangeType: 'direct',
    //         exchange: 'sendEmailEx',
    //         deadLetterExchange: 'sendEmailExDLX',
    //         deadLetterRoutingKey: 'sendEmailRoutingKeyDLX'
    //       }
    //     }
    //   }
    // ])
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    JwtRefreshTokenStrategy,
    GoogleStrategy,
    GithubStrategy,
    {
      provide: 'SUBSCRIBER_SERVICE',
      useFactory: (configService: ConfigService) => {
        const user = configService.get('RABBITMQ_USER')
        const password = configService.get('RABBITMQ_PASSWORD')
        const host = configService.get('RABBITMQ_HOST')
        const sendEmailExchange = 'sendEmailEx'
        const sendEmailQueue = 'sendEmailQueueProcess'
        const sendEmailExChangeDLX = 'sendEmailExDLX'
        const sendEmailRoutingKeyDLX = 'sendEmailRoutingKeyDLX'
        return ClientProxyFactory.create({
          transport: Transport.RMQ,
          options: {
            urls: [`amqp://${user}:${password}@${host}`],
            queue: sendEmailQueue,
            // prefetchCount: 1,
            queueOptions: {
              durable: true,
              exclusive: false,
              exChangeType: 'direct',
              exchange: sendEmailExchange,
              deadLetterExchange: sendEmailExChangeDLX,
              deadLetterRoutingKey: sendEmailRoutingKeyDLX
            }
          }
        })
      },
      inject: [ConfigService]
    }
  ],
  exports: [AuthService]
})
export class AuthModule {}
