import { Module } from '@nestjs/common'
import { UserService } from './user.service'
import { UserController } from './user.controller'
import { MongooseModule } from '@nestjs/mongoose'
import { User, UserSchema } from './model/user.schema'
import { ConfigModule } from '@nestjs/config'
import { CqrsModule } from '@nestjs/cqrs'
import { CONNECTION_MASTER, CONNECTION_SLAVE } from 'src/constant/connection.config'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }], CONNECTION_MASTER),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }], CONNECTION_SLAVE),
    ConfigModule,
    CqrsModule
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService]
})
export class UserModule {}
