import {AccessLevels} from "../../../../../entities";
import {SHARED_TO_TYPES} from "../../../constants";
import {CallHandler, ExecutionContext, Injectable, mixin, NestInterceptor} from "@nestjs/common";
import {SharingSecurityService} from "../../../sharing-security.provider";
import {Observable} from "rxjs";
import {getIdsFromRequest, hasArrayAccess, setArrayAccess} from "../../../utility";
import {AuthInfo} from "@asemin/nestjs-utils";

const ArrayRoleLevelSharingInterceptor = (accessLevel: AccessLevels | string, entityIdName: string = '_id'): any => {
    @Injectable()
    class ArraySharedToSharing implements NestInterceptor {
        constructor(private sharingSecurity: SharingSecurityService) {
        }

        async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
            const request = context.switchToHttp().getRequest();

            if (hasArrayAccess(request, accessLevel))
                return next.handle();

            const entityIds = getIdsFromRequest(request, entityIdName);
            const sharedTo = await AuthInfo.getByName(request, SHARED_TO_TYPES.ROLE_LEVEL);

            const accesses = await this.sharingSecurity.getAllRoleBestAccesses(entityIds, sharedTo);
            if (accesses.size > 0)
                setArrayAccess(request, accesses);

            return next.handle();
        }
    }

    return mixin(ArraySharedToSharing);
}

export {ArrayRoleLevelSharingInterceptor}