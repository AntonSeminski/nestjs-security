import {PermissionGuard} from "./permission.guard";
import {EPermissionTypes} from "@jira-killer/constants";

export const SystemPermissionGuard: any = (permissionName: string) => PermissionGuard(EPermissionTypes.System, permissionName)