import { Injectable, CanActivate, ExecutionContext, HttpException, HttpStatus } from '@nestjs/common'
import { AuthCompanyService } from 'src/auth-company/auth-company.service'
import { CompaniesService } from 'src/companies/companies.service'

@Injectable()
export class AuthGuardCompany implements CanActivate {
  constructor(
    private readonly authCompanyService: AuthCompanyService,
    private readonly companiesService: CompaniesService
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest()
    const cp_access_token = request.headers['x-at-tk-cp'] ? request.headers['x-at-tk-cp'].split(' ')[1] : null
    const cp_refresh_token = request.headers['x-rf-tk-cp'] ? request.headers['x-rf-tk-cp'].split(' ')[1] : null
    if (!cp_refresh_token || !cp_access_token) throw new HttpException('Token không hợp lệ1', HttpStatus.UNAUTHORIZED)

    const { key_access_token, key_refresh_token } = await this.authCompanyService.findKeyByRefreshToken({
      cp_refresh_token
    })
    if (!key_access_token || !key_refresh_token) throw new HttpException('Token không hợp lệ2', HttpStatus.UNAUTHORIZED)
    try {
      const dataToken = await Promise.all([
        this.authCompanyService.verifyToken(cp_access_token, key_access_token),
        this.authCompanyService.verifyToken(cp_refresh_token, key_refresh_token)
      ])

      const inforCompany = await this.companiesService.getCompanyByIdAuth({ id: dataToken[1]._id })
      request.company = inforCompany

      return true
    } catch (error) {
      console.log(error)
      throw new HttpException('Token không hợp lệ1', HttpStatus.UNAUTHORIZED)
    }
  }
}
