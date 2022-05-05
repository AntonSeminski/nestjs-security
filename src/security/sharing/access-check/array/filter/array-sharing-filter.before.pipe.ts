import {ArgumentMetadata,Inject,Injectable, mixin,PipeTransform} from "@nestjs/common";
import {REQUEST} from "@nestjs/core";
import {throwException} from "@asemin/nestjs-utils";
import {API_ERROR_CODES} from '@jira-killer/constants';
import {AccessLevels, hasAccess} from "../../../../../entities/inmost/sharing/access-level.constants";
import {getArrayAccess, hasArrayAccess} from "../../../utility/access.utility";

const CheckArraySecurity = (accessLevel: AccessLevels | string): any => {
    @Injectable()
    class ArraySecurityPipe implements PipeTransform {
        constructor(@Inject(REQUEST) private request) {}

        async transform(entities: any, metadata: ArgumentMetadata): Promise<any> {
            if (!hasArrayAccess(this.request, accessLevel))
                throwException(API_ERROR_CODES.RECORD_SECURITY.NO_ACCESS);

            const bestAccessByEntity = getArrayAccess(this.request);

            return entities
                .map(entity =>
                    hasAccess(accessLevel, bestAccessByEntity.get(entity._id))
                        ? entity
                        : null
                ).filter(entity => entity !== null);
        }
    }

    return mixin(ArraySecurityPipe);
}

export {CheckArraySecurity}
