import {PermissionManager} from "./managers";
import {PermissionAssignmentService} from "../permission-assignment";
import {Injectable} from "@nestjs/common";
import {PermissionDto, UserInfoDto} from "./dto";
import {isHasEmpty, throwException} from "@asemin/nestjs-utils";
import {API_ERROR_CODES} from "@jira-killer/constants";
import {AvailablePermissionDto} from "./dto/available-permission.dto";
import {PermissionSetAllService} from "../permission-set";

@Injectable()
export class PermissionService {
    constructor(
        private permissionManager: PermissionManager,
        private permissionAssignmentService: PermissionAssignmentService,
    ) {}

    async getAllForUser(user: UserInfoDto): Promise<PermissionDto[]> {
        if (!user) throwException(API_ERROR_CODES.COMMON.EMPTY_PARAM, {method: 'getAllForUser', params: {user: user}});

        const userPermissionSets = [...(user.permissionSets ?? []), user.profile];

        const allAssignments = await this.permissionAssignmentService.getAllByPermissionSetIds(userPermissionSets);
        if (!allAssignments) return [];

        //uniq
        const permissionIds: Set<string> = new Set(allAssignments.map(assignment => assignment.permission));

        return this.permissionManager.getAllByIds(Array.from(permissionIds));
    }

    async getAllByPermissionSetId(permissionSetId: string): Promise<AvailablePermissionDto[]> {
        if (!permissionSetId) throwException(API_ERROR_CODES.COMMON.EMPTY_PARAM, {method: 'getAllByPermissionSetId'});

        const assignmentByPermission = new Map<string, string>();
        let availablePermissions: AvailablePermissionDto[] = [];

        const allAssignments = await this.permissionAssignmentService.getAllByPermissionSetIds([permissionSetId]);

        allAssignments.forEach(permissionAssignment => assignmentByPermission.set(permissionAssignment.permission, permissionAssignment._id));

        const allPermissions = await this.permissionManager.getAll();
        allPermissions.forEach(permission => {
            availablePermissions.push({...permission, isAvailable: !!assignmentByPermission.get(permission._id)})
        });

        return availablePermissions;
    }

    async getByIndexesAndUser(indexes: string[], user: UserInfoDto): Promise<any> {
        if (isHasEmpty(indexes, user)) throwException(API_ERROR_CODES.COMMON.EMPTY_PARAM, {
            method: 'getByIndexesAndUser',
            params: {indexes: indexes, user: user}
        });

        const userPermissionSets = [...(user.permissionSets ?? []), user.profile];

        if (userPermissionSets.length === 0)
            return [];

        const allAssignments = await this.permissionAssignmentService.getAllByPermissionSetIds(userPermissionSets);

        if (!allAssignments || allAssignments.length === 0)
            return [];

        const permissionIds = allAssignments.map(assignment => assignment.permission);
        const allPermissions = await this.permissionManager.getAllByIds(permissionIds);

        if (!allPermissions)
            return [];

        const result = {}; // { index: permission }

        allPermissions
            .filter(permission => indexes.includes(permission.index))
            ?.forEach(permission => {
                result[permission.index] = permission;
            });

        return result;
    }

    async getObjectPermissionsByPermissionSets(objectName: string, permissionSets: string[]): Promise<PermissionDto[]> {
        if (!objectName) throwException(API_ERROR_CODES.COMMON.EMPTY_PARAM, {
            method: 'getObjectPermissions',
            fields: {objectName: objectName, permissionSets: permissionSets}
        })

        const objectPermissions = await this.permissionManager.getObjectPermissions(objectName);

        return this.getAvailablePermissionsByPermissionSets(objectPermissions, permissionSets);
    }

    async getObjectPermissionByValueForPermissionSets(objectName: string, value: string, permissionSets: string[]): Promise<PermissionDto> {
        if (isHasEmpty(objectName, value, permissionSets)) throwException(API_ERROR_CODES.COMMON.EMPTY_PARAM, {
            method: 'getObjectPermissions',
            fields: {objectName: objectName, value: value, permissionSets: permissionSets}
        });

        const objectPermission = await this.permissionManager.getObjectPermissionByValue(objectName, value);

        const assignment = await this.permissionAssignmentService.getByPermissionIdAndPermissionSetIds(objectPermission._id, permissionSets);
        if (!assignment) throwException(API_ERROR_CODES.PERMISSION.NONE_AVAILABLE);

        return objectPermission;
    }

    private async getAvailablePermissionsByPermissionSets(permissions: PermissionDto[], permissionSets: string[]) {
        const objectPermissionIds = permissions.map(permission => permission._id);

        const permissionById = new Map();
        permissions.forEach(permission => {
            permissionById.set(permission._id, permission);
        })

        const assignments = await this.permissionAssignmentService.getByPermissionIdsAndPermissionSetIds(objectPermissionIds, permissionSets);
        if (!assignments) return [];

        return assignments
            .map(assignment => permissionById.get(assignment.permission) ?? null)
            .filter(assignment => assignment);
    }
}