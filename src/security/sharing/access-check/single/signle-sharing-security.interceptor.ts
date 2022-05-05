import {applyDecorators, UseInterceptors} from "@nestjs/common";
import {OrgWideSecurity} from "../global";
import {AccessLevels} from "../../../../entities";
import {RoleLevelSingleSharingInterceptor} from "./find";
import {UserSingleSharingInterceptor} from "./find";
import {CheckSingleSharingInterceptor} from "./check";

export const SingleSharingSecurity = (accessLevel: AccessLevels | string, entityName: string) =>
    applyDecorators(
        UseInterceptors(
            OrgWideSecurity(entityName, accessLevel),
            RoleLevelSingleSharingInterceptor(accessLevel),
            UserSingleSharingInterceptor(accessLevel),

            CheckSingleSharingInterceptor(accessLevel)
        )
    );