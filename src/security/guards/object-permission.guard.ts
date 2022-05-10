import {PermissionGuard} from "./permission.guard";
import {PERMISSION_TYPES} from "../permission";

export const ObjectPermissionGuard: any = (permissionName: string) => PermissionGuard(PERMISSION_TYPES.OBJECT, permissionName);
