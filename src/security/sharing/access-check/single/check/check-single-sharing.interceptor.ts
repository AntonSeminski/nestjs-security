import {
    CallHandler,
    ExecutionContext,
    mixin,
    NestInterceptor,
} from "@nestjs/common";
import {AccessLevels} from "../../../../../entities";
import {Observable} from "rxjs";
import {hasSingleAccess} from "../../../utility";
import {throwException} from "@asemin/nestjs-utils";
import {API_ERROR_CODES} from '@jira-killer/constants';

const CheckSingleSharingInterceptor = (requiredAccessLevel: AccessLevels | string): any => {
    class CheckSingleSharing implements NestInterceptor {
        async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
            const request = context.switchToHttp().getRequest();

            if (!hasSingleAccess(request, requiredAccessLevel))
                throwException(API_ERROR_CODES.RECORD_SECURITY.NO_ACCESS);

            return next.handle();
        }
    }

    return mixin(CheckSingleSharing);
}

export {CheckSingleSharingInterceptor}