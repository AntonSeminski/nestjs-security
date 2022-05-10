import {CanActivate, ExecutionContext, Injectable, mixin} from "@nestjs/common";
import {API_ERROR_CODES} from "@jira-killer/constants";
import {PermissionAssignmentService} from "../permission-assignment";
import {PermissionService, UserInfoDto} from "../permission";
import {getAuthInfo, throwException} from "@asemin/nestjs-utils";

export const PermissionGuard: any = (type: string, permissionName: string) => {
    @Injectable()
    class SystemPermission implements CanActivate {
        constructor(
            private permissionAssignmentService: PermissionAssignmentService,
            private permissionService: PermissionService
        ) {}

        async canActivate(context: ExecutionContext): Promise<boolean> {
            const request = context.switchToHttp().getRequest();
            const payload: UserInfoDto = await getAuthInfo(request.headers?.authorization);

            const permissionSets = [...payload.permissionSets, payload.profile];
            if (!permissionSets)
                throwException(API_ERROR_CODES.PERMISSION.NONE_AVAILABLE);

            const permission = await this.permissionService.getByNameAndType(permissionName, type);
            if (!permission) throwException(API_ERROR_CODES.PERMISSION.NOT_FOUND);

            const hasPermission = this.permissionAssignmentService.getByPermissionAndPermissionSets(permission._id, permissionSets);
            if (!hasPermission)
                throwException(API_ERROR_CODES.PERMISSION.NONE_AVAILABLE)

            return true;
        }
    }

    return mixin(SystemPermission);
}