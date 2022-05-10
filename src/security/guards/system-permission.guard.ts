import {PermissionGuard} from "./permission.guard";
import {PERMISSION_TYPES} from "../permission";

export const SystemPermissionGuard: any = (permissionName: string) => PermissionGuard(PERMISSION_TYPES.SYSTEM, permissionName)