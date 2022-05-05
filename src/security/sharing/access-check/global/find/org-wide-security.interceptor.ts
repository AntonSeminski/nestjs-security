import {CallHandler, ExecutionContext, Injectable, mixin, NestInterceptor} from "@nestjs/common";
import {Observable} from "rxjs";
import {SharingSecurityService} from "../../../sharing-security.provider";
import {AccessLevels, hasAccess} from "../../../../../entities";
import {hasSingleAccess, setGlobalAccess} from "../../../utility";

export const OrgWideSecurity = (entityName: string, accessLevel: AccessLevels | string): any => {
    @Injectable()
    class OrgWide implements NestInterceptor {
        constructor(private sharingSecurity: SharingSecurityService) {}

        async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
            const request = context.switchToHttp().getRequest();

            if (hasSingleAccess(request, accessLevel))
                return next.handle();

            const orgWideAccess = await this.sharingSecurity.getOrgWideAccess(entityName);

            if (hasAccess(accessLevel, orgWideAccess))
                setGlobalAccess(request, orgWideAccess);

            return next.handle();
        }
    }

    return mixin(OrgWide);
}