import {Injectable} from "@nestjs/common";
import {PermissionManager} from "./managers";
import {PermissionDto} from "./dto";
import {isHasEmpty, throwException} from "@asemin/nestjs-utils";
import {API_ERROR_CODES} from '@jira-killer/constants'
import {PermissionAssignmentService} from "../permission-assignment";
import {UserInfoDto} from "./dto";
import {UpdatePermissionDto} from "./dto";


@Injectable()
export class PermissionService {
    constructor(private permissionManager: PermissionManager,
                private permissionAssignmentService: PermissionAssignmentService
    ) {}

    async getAll(): Promise<PermissionDto[]> {
        return this.permissionManager.getAll();
    }

    async getAllForUser(user: UserInfoDto): Promise<PermissionDto[]> {
        if (!user) throwException(API_ERROR_CODES.COMMON.EMPTY_PARAM, {method: 'getAllForUser', params: {user: user}});

        const userPermissionSets = [...user.permissionSets, user.profile];
        const allAssignments = await this.permissionAssignmentService.getAllByPermissionSets(userPermissionSets);

        const permissionIds = allAssignments.map(assignment => assignment.permission);

        return this.getAllByIds(permissionIds);
    }

    async getByIndexesAndUser(indexes: string[], user: UserInfoDto): Promise<PermissionDto[]> {
        if (isHasEmpty(indexes, user)) throwException(API_ERROR_CODES.COMMON.EMPTY_PARAM, {method: 'getByIndexesAndUser', params: {indexes: indexes, user: user}});

        const userPermissionSets = [...user.permissionSets, user.profile];

        if (userPermissionSets.length === 0)
            return [];

        const allAssignments = (await this.permissionAssignmentService.getAllByPermissionSets(userPermissionSets));

        if (!allAssignments || allAssignments.length === 0)
            return [];

        const permissionIds = allAssignments.map(assignment => assignment.permission);
        const allPermissions = await this.getAllByIds(permissionIds);

        if (!allPermissions)
            return [];

        return allPermissions.filter(permission => indexes.includes(permission.index));
    }

    async getAllByIds(ids: string[]): Promise<PermissionDto[]> {
        if (!ids) throwException(API_ERROR_CODES.COMMON.EMPTY_PARAM, {method: 'getAllByIds', params: {ids: ids}});

        return this.permissionManager.getAllByIds(ids);
    }

    async getByName(apiName: string): Promise<PermissionDto>{
        if (isHasEmpty(apiName)) throwException(API_ERROR_CODES.COMMON.EMPTY_PARAM, {method:'getByName', fields: {apiName}})

        return this.permissionManager.getByName(apiName);
    }

    async getByNameAndType(apiName: string, type: string): Promise<PermissionDto>{
        if (isHasEmpty(apiName, type)) throwException(API_ERROR_CODES.COMMON.EMPTY_PARAM, {method:'getByNameAndType', fields: {apiName, type}})

        return this.permissionManager.getByNameAndType(apiName, type);
    }

    async create(permission: PermissionDto): Promise<PermissionDto> {
        if (isHasEmpty(permission)) throwException(API_ERROR_CODES.COMMON.EMPTY_PARAM, {method: 'create', fields: {permission}});

        return this.permissionManager.create(permission);
    }

    async createMany(permissions: PermissionDto[]): Promise<PermissionDto[]> {
        if (isHasEmpty(permissions)) throwException(API_ERROR_CODES.COMMON.EMPTY_PARAM, {method: 'createMany', fields: {permission: permissions}});

        return this.permissionManager.createMany(permissions);
    }

    async update(permission: UpdatePermissionDto): Promise<PermissionDto> {
        if (isHasEmpty(permission)) throwException(API_ERROR_CODES.COMMON.EMPTY_PARAM, {method: 'update', fields: {permission}});

        return this.permissionManager.update(permission);
    }

    async deleteById(id: string): Promise<boolean> {
        if (isHasEmpty(id)) throwException(API_ERROR_CODES.COMMON.EMPTY_PARAM, {method: 'deleteById', fields: {id}});

        return this.permissionManager.deleteById(id);
    }
}