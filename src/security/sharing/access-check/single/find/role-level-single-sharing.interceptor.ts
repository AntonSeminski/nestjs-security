import {AccessLevels, hasAccess} from "../../../../../entities";
import {CallHandler, ExecutionContext, Injectable, mixin, NestInterceptor} from "@nestjs/common";
import {SharingSecurityService} from "../../../sharing-security.provider";
import {Observable} from "rxjs";
import {getIdFromRequest, hasSingleAccess, setSingleAccess} from "../../../utility";
import {getAuthInfoByName} from "@asemin/nestjs-utils";
import {SHARED_TO_TYPES} from "../../../constants";

const RoleLevelSingleSharingInterceptor = (accessLevel: AccessLevels | string, idName: string = ''): any => {
    @Injectable()
    class SingleRoleSharing implements NestInterceptor {
        constructor(private sharingSecurity: SharingSecurityService) {
        }

        async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
            const request = context.switchToHttp().getRequest();

            if (hasSingleAccess(request, accessLevel))
                return next.handle();

            const entityId = getIdFromRequest(request, idName);
            const roleLevel = await getAuthInfoByName(request, SHARED_TO_TYPES.ROLE_LEVEL);

            const bestAccess = await this.sharingSecurity.getRoleBestAccess(entityId, roleLevel);

            if (hasAccess(accessLevel, bestAccess))
                setSingleAccess(request, bestAccess);

            return next.handle();
        }
    }

    return mixin(SingleRoleSharing);
}

export {RoleLevelSingleSharingInterceptor}