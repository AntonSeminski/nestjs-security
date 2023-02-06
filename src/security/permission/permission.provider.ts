import {Injectable} from "@nestjs/common";
import {PermissionManager} from "./managers";
import {PermissionDto} from "./dto";
import {isHasEmpty, throwException} from "@asemin/nestjs-utils";
import {API_ERROR_CODES} from '@jira-killer/constants'
import {UpdatePermissionDto} from "./dto";
import {AccessLevels} from "../../entities";
import {FieldPermissionDto} from "./dto/field-permission.dto";


@Injectable()
export class PermissionProvider {
    constructor(private permissionManager: PermissionManager) {}

    async getAll(): Promise<PermissionDto[]> {
        return this.permissionManager.getAll();
    }

    async getByName(apiName: string): Promise<PermissionDto>{
        if (isHasEmpty(apiName)) throwException(API_ERROR_CODES.COMMON.EMPTY_PARAM, {method:'getByName', fields: {apiName}})

        return this.permissionManager.getByName(apiName);
    }

    async getByNameAndType(apiName: string, type: string): Promise<PermissionDto>{
        if (isHasEmpty(apiName, type)) throwException(API_ERROR_CODES.COMMON.EMPTY_PARAM, {method:'getByNameAndType', fields: {apiName, type}})

        return this.permissionManager.getByNameAndType(apiName, type);
    }

    async getObjectPermissions(objectName: string): Promise<PermissionDto[]> {
        if (!objectName) throwException(API_ERROR_CODES.COMMON.EMPTY_PARAM, {method:'getObjectPermissions', fields: {objectName: objectName}})

        return this.permissionManager.getObjectPermissions(objectName);
    }

    async getFieldPermissions(objectName: string, fieldNames: Array<string>): Promise<Array<FieldPermissionDto>> {
        if (isHasEmpty(objectName, fieldNames)) throwException(API_ERROR_CODES.COMMON.EMPTY_PARAM, {method:'getFieldPermissions'})

        return this.permissionManager.getFieldPermissions(objectName, fieldNames);
    }

    async getObjectPermissionByAccessLevel(objectName: string, value: string): Promise<PermissionDto> {
        if (isHasEmpty(objectName, value)) throwException(API_ERROR_CODES.COMMON.EMPTY_PARAM, {method:'getObjectPermissions', fields: {objectName: objectName, value: value}});

        return this.permissionManager.getObjectPermissionByAccessLevel(objectName, value);
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