import {CallHandler, ExecutionContext, Injectable, mixin, NestInterceptor,} from "@nestjs/common";
import {AccessLevels, hasAccess} from "../../../../../entities";
import {hasGlobalAccess} from "../../../utility";
import {map, Observable} from "rxjs";
import {SharingSecurityService} from "../../../sharing-security.provider";
import {API_ERROR_CODES} from '@jira-killer/constants'
import {AuthInfo, throwException} from "@asemin/nestjs-utils";
import {SHARED_TO_TYPES} from "../../../constants";

const ArrayUserSharingFilterInterceptor = (accessLevel: AccessLevels | string, entityIdName: string = '_id'): any => {
    @Injectable()
    class ArrayUserSharingFilter implements NestInterceptor {
        constructor(private sharingSecurity: SharingSecurityService) {}

        async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
            const request = context.switchToHttp().getRequest();

            return next
                .handle()
                .pipe(
                    map(async (records) => {
                        if (hasGlobalAccess(request, accessLevel))
                            return next.handle();

                        const entityIds = records.map(record => record[entityIdName])
                        const allSharedTo = await AuthInfo.getByNames(request, Object.values(SHARED_TO_TYPES));

                        const bestAccessesByEntity = await this.sharingSecurity.getAllBestAccesses(entityIds, allSharedTo);

                        if (bestAccessesByEntity.size === 0)
                            throwException(API_ERROR_CODES.RECORD_SECURITY.NO_ACCESS)

                        return records
                            .map(record =>
                                hasAccess(accessLevel, bestAccessesByEntity?.get(record[entityIdName]))
                                ? record
                                : null)
                            .filter(r => r);
                    })
                );
        }
    }

    return mixin(ArrayUserSharingFilter);
}

export {ArrayUserSharingFilterInterceptor}
