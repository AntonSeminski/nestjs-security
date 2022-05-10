import {PermissionGuard} from "./permission.guard";

export const SystemPermissionGuard: any = (permissionName: string) => PermissionGuard(PERMISSION_TYPES.SYSTEM, permissionName)