import {PermissionGuard} from "./permission.guard";

export const ObjectPermissionGuard: any = (permissionName: string) => PermissionGuard(PERMISSION_TYPES.OBJECT, permissionName);
