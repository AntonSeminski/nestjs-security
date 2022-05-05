import {AccessLevels} from "../../../../entities";
import {applyDecorators, UseInterceptors} from "@nestjs/common";
import {OrgWideSecurity} from "../global";
import {ArrayRoleLevelSharingInterceptor} from "./find";
import {ArrayOwnerSharingInterceptor} from "./find";
import {CheckArraySecurity} from "./filter";

export const ArraySharingSecurity = (accessLevel: AccessLevels | string, entityName: string) =>
    applyDecorators(
        UseInterceptors(
            OrgWideSecurity(entityName, accessLevel),
            ArrayRoleLevelSharingInterceptor(accessLevel),
            ArrayOwnerSharingInterceptor(accessLevel),

            CheckArraySecurity(accessLevel)
        )
    )