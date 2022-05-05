import {AccessLevels} from "../../../../../entities";
import {ArraySharedToSharingInterceptor} from "./array-shared-to.sharing";
import {SHARED_TO_TYPES} from "../../../constants";

export const ArrayOwnerSharingInterceptor =
    (accessLevel: AccessLevels | string, entityIdName: string = ''): any =>
        ArraySharedToSharingInterceptor(accessLevel, SHARED_TO_TYPES.OWNER, entityIdName)