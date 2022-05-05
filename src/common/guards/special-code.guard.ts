import {CanActivate, ExecutionContext, Injectable} from '@nestjs/common';
import {Observable} from 'rxjs';
import {ConfigService} from '@nestjs/config';
import {throwException} from "@asemin/nestjs-utils";
import {API_ERROR_CODES} from '@jira-killer/constants'

@Injectable()
export class SpecialCodeGuard implements CanActivate {
    constructor(private configService: ConfigService) {}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();
        const code = request.body?.code;

        if (!code) throwException(API_ERROR_CODES.AUTH.INVALID_SPECIAL_CODE);

        return code === this.configService.get('SPECIAL_SECRET_PHRASE')
    }
}