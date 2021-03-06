import {CanActivate, ExecutionContext, Injectable} from "@nestjs/common";
import {AuthInfo, throwException} from "@asemin/nestjs-utils";
import {WorkspaceTokenService} from "../../services";
import {API_ERROR_CODES} from '@jira-killer/constants';

@Injectable()
export class FeatureGuard implements CanActivate{
    constructor(
        private workspaceTokenService: WorkspaceTokenService,
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const tokenType = process.env.AUTH_TOKEN_TYPE ?? 'Bearer';

        const payload = await AuthInfo.validate(request, tokenType, this.workspaceTokenService);

        const isFeatureAvailable = payload?.features.find(feature => feature == process.env.FEATURE_NAME);

        if (!isFeatureAvailable) throwException(API_ERROR_CODES.FEATURE.NOT_AVAILABLE);

        return true;
    }
}