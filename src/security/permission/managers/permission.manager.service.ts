import {Injectable} from '@nestjs/common';
import {MongoPermissionManager} from './mongo-permission';
import IPermissionManager from "./permission.manager.interface";
import {PermissionDto} from "../dto";
import {isHasEmpty, throwException} from "@asemin/nestjs-utils";
import {API_ERROR_CODES} from '@jira-killer/constants'
import {UpdatePermissionDto} from "../dto";

@Injectable()
export class PermissionManager implements IPermissionManager {
    constructor(private permissionManager: MongoPermissionManager) {
    }

    async getAll(): Promise<PermissionDto[]> {
        return this.permissionManager.getAll();
    }

    async getAllByIds(ids: string[]): Promise<PermissionDto[]> {
        if (!ids) throwException(API_ERROR_CODES.COMMON.EMPTY_PARAM, {method:'getByName', fields: {ids: ids}})

        return this.permissionManager.getAllByIds(ids);
    }

    async getByName(apiName: string): Promise<PermissionDto> {
        if (isHasEmpty(apiName)) throwException(API_ERROR_CODES.COMMON.EMPTY_PARAM, {method:'getByName', fields: {apiName: apiName}});

        return this.permissionManager.getByName(apiName);
    }

    async getByNameAndType(apiName: string, type:string): Promise<PermissionDto> {
        if (isHasEmpty(apiName, type)) throwException(API_ERROR_CODES.COMMON.EMPTY_PARAM, {method:'getByNameAndType', fields: {apiName: apiName, type: type}});

        return this.permissionManager.getByNameAndType(apiName, type);
    }

    async getObjectPermissions(objectName: string): Promise<PermissionDto[]> {
        if (!objectName) throwException(API_ERROR_CODES.COMMON.EMPTY_PARAM, {method:'getObjectPermissions', fields: {objectName: objectName}})

        return this.permissionManager.getObjectPermissions(objectName);
    }

    async getObjectPermissionByValue(objectName: string, value: string): Promise<PermissionDto> {
        if (isHasEmpty(objectName, value)) throwException(API_ERROR_CODES.COMMON.EMPTY_PARAM, {method:'getObjectPermissions', fields: {objectName: objectName, value: value}});

        return this.permissionManager.getObjectPermissionByValue(objectName, value);
    }

    async create(permission: PermissionDto): Promise<PermissionDto> {
        if (isHasEmpty(permission)) throwException(API_ERROR_CODES.COMMON.EMPTY_PARAM, {method: 'create', fields: {permission: permission}});

        return this.permissionManager.create(permission);
    }

    async createMany(permissions: PermissionDto[]): Promise<PermissionDto[]> {
        if (isHasEmpty(permissions)) throwException(API_ERROR_CODES.COMMON.EMPTY_PARAM, {method: 'createMany', fields: {permission: permissions}});

        return this.permissionManager.createMany(permissions);
    }

    async update(permission: UpdatePermissionDto): Promise<PermissionDto> {
        if (isHasEmpty(permission)) throwException(API_ERROR_CODES.COMMON.EMPTY_PARAM, {method: 'update', fields: {permission: permission}});

        return this.permissionManager.update(permission);
    }

    async deleteById(id: string): Promise<boolean> {
        if (isHasEmpty(id)) throwException(API_ERROR_CODES.COMMON.EMPTY_PARAM, {method: 'deleteById', fields: {id: id}});

        return this.permissionManager.deleteById(id);
    }
}