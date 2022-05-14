import {PermissionGuard} from "./permission.guard";
import {EPermissionTypes} from "@jira-killer/constants";

export const ObjectPermissionGuard: any = (permissionName: string) => PermissionGuard(EPermissionTypes.Object, permissionName);