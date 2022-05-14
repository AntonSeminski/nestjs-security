import {AccessLevels} from "../../../../../entities";
import {CallHandler, ExecutionContext, Injectable, mixin, NestInterceptor} from "@nestjs/common";
import {SharingSecurityService} from "../../../sharing-security.provider";
import {Observable} from "rxjs";
import {getIdsFromRequest, hasArrayAccess, setArrayAccess} from "../../../utility";
import {AuthInfo} from "@asemin/nestjs-utils";

const ArraySharedToSharingInterceptor = (accessLevel: AccessLevels | string, sharedToName: string, entityIdName: string = '_id'): any => {
    @Injectable()
    class ArraySharedToSharing implements NestInterceptor {
        constructor(private sharingSecurity: SharingSecurityService) {}

        async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
            const request = context.switchToHttp().getRequest();

            if (hasArrayAccess(request, accessLevel))
                return next.handle();

            const entityIds = getIdsFromRequest(request, entityIdName);
            const sharedTo = await AuthInfo.getByName(request, sharedToName);

            const accesses = await this.sharingSecurity.getBestAccesses(entityIds, sharedTo);
            if (accesses.size > 0)
                setArrayAccess(request, accesses);

            return next.handle();
        }
    }

    return mixin(ArraySharedToSharing);
}

export {ArraySharedToSharingInterceptor}