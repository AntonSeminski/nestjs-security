import {PermissionGuard} from "./permission.guard";
import {PermissionTypes} from "@jira-killer/constants";

export const SystemPermissionGuard: any = (permissionName: string) => PermissionGuard(PermissionTypes.SYSTEM, permissionName)