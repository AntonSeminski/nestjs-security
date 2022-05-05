import {CallHandler, ExecutionContext, Injectable, mixin, NestInterceptor} from "@nestjs/common";
import {Observable} from "rxjs";
import {AccessLevels, hasAccess} from "../../../../../entities/inmost/sharing/access-level.constants";

export const SuperPermissionSecurity = (entityName: string, accessLevel: AccessLevels ): any => {
    @Injectable()
    class SuperPermissionInterceptor implements NestInterceptor {
        async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
            const request = context.switchToHttp().getRequest();
            const sharingAccess = request?.sharingAccess;

            if (sharingAccess && hasAccess(accessLevel, sharingAccess)) {
                return next.handle();
            }

            return next.handle();
        }
    }

    return mixin(SuperPermissionInterceptor);
}