import { forwardRef, Module } from '@nestjs/common'
import { AuthCompanyService } from './auth-company.service'
import { AuthCompanyController } from './auth-company.controller'
import { CompaniesModule } from 'src/companies/companies.module'
import { ConfigModule } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'
import { RefreshToken, RefreshTokenSchema } from './model/refreshToken.model'
import { CONNECTION_MASTER, CONNECTION_SLAVE } from 'src/constant/connection.config'
import { MongooseModule } from '@nestjs/mongoose'
import { BlackListToken, BlackListTokenSchema } from './model/blackListToken.model'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: RefreshToken.name, schema: RefreshTokenSchema }], CONNECTION_MASTER),
    MongooseModule.forFeature([{ name: RefreshToken.name, schema: RefreshTokenSchema }], CONNECTION_SLAVE),
    MongooseModule.forFeature([{ name: BlackListToken.name, schema: BlackListTokenSchema }], CONNECTION_MASTER),
    MongooseModule.forFeature([{ name: BlackListToken.name, schema: BlackListTokenSchema }], CONNECTION_SLAVE),
    ConfigModule,
    JwtModule.register({}),
    forwardRef(() => CompaniesModule)
  ],
  controllers: [AuthCompanyController],
  providers: [AuthCompanyService],
  exports: [AuthCompanyService]
})
export class AuthCompanyModule {}
