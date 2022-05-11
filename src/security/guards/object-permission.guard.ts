import {PermissionGuard} from "./permission.guard";
import {PermissionTypes} from "@jira-killer/constants";

export const ObjectPermissionGuard: any = (permissionName: string) => PermissionGuard(PermissionTypes.OBJECT, permissionName);