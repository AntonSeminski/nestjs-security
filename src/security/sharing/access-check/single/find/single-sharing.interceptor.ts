import {AccessLevels, hasAccess} from "../../../../../entities";
import {CallHandler, ExecutionContext, Injectable, mixin, NestInterceptor} from "@nestjs/common";
import {Observable} from "rxjs";
import {SharingSecurityService} from "../../../sharing-security.provider";
import {getIdFromRequest, hasSingleAccess, setSingleAccess} from "../../../utility";
import {AuthInfo} from "@asemin/nestjs-utils";


const SingleSharingInterceptor = (accessLevel: AccessLevels | string, shareToName: string, idName: string = ''): any => {
    @Injectable()
    class SingleSharing implements NestInterceptor {
        constructor(private sharingSecurity: SharingSecurityService) {}

        async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
            const request = context.switchToHttp().getRequest();

            if (hasSingleAccess(request, accessLevel))
                return next.handle();

            const entityId = getIdFromRequest(request, idName);
            const shareTo = await AuthInfo.getByName(request, shareToName);

            const bestAccess = await this.sharingSecurity.getBestAccess(entityId, shareTo);

            if (hasAccess(accessLevel, bestAccess))
                setSingleAccess(request, bestAccess);

            return next.handle();
        }
    }

    return mixin(SingleSharing);
}

export {SingleSharingInterceptor}