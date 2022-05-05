import {AccessLevels} from "../../../../../entities";
import {SingleSharingInterceptor} from "./single-sharing.interceptor";


const UserSingleSharingInterceptor =
    (accessLevel: AccessLevels | string, idName: string = ''): any =>
        SingleSharingInterceptor(accessLevel, '_id', idName);

export {UserSingleSharingInterceptor}