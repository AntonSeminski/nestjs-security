import {Injectable} from "@nestjs/common";
import {PermissionSetManager} from "./managers/permission-set.manager.service";
import {PermissionSetDto} from "../../entities/inmost/permission-set/pemrission-set.dto";
import {isHasEmpty, throwException} from "@asemin/nestjs-utils";
import {API_ERROR_CODES} from "@jira-killer/constants";


@Injectable()
export class PermissionSetService{
    constructor(private permissionSetManager: PermissionSetManager) {
    }

    async getAll(): Promise<PermissionSetDto[]> {
        return this.permissionSetManager.getAll();
    }

    async getByName(name: string): Promise<PermissionSetDto> {
        if (!name) throwException(API_ERROR_CODES.COMMON.EMPTY_PARAM, {method: 'getByName', params: {name: name}})

        return this.permissionSetManager.getByName(name);
    }

    async getByUserId(userId: string): Promise<PermissionSetDto[]> {
        if (!userId) throwException(API_ERROR_CODES.COMMON.EMPTY_PARAM, {method: 'getByUserId', params: {userId: userId}})

        return this.permissionSetManager.getByUserId(userId);
    }

    async getIdsByUserId(userId: string): Promise<String[]> {
        if (!userId) throwException(API_ERROR_CODES.COMMON.EMPTY_PARAM, {method: 'getIdsByUserId', params: {userId: userId}})

        return this.permissionSetManager.getIdsByUserId(userId);
    }

    async create(permissionSet: PermissionSetDto): Promise<PermissionSetDto> {
        if (!permissionSet) throwException(API_ERROR_CODES.COMMON.EMPTY_PARAM, {method: 'create', params: {permissionSet: permissionSet}})

        return this.permissionSetManager.create(permissionSet);
    }


    async assignUser(permissionSetId: string, userId: string) {
        if (isHasEmpty(permissionSetId, userId)) throwException(API_ERROR_CODES.COMMON.EMPTY_PARAM, {method: 'assignUser', params: {permissionSetId: permissionSetId, userId: userId}})

        return this.permissionSetManager.assignUser(permissionSetId, userId);
    }

    async removeAssignment(permissionSetId: string, userId: string) {
        if (isHasEmpty(permissionSetId, userId)) throwException(API_ERROR_CODES.COMMON.EMPTY_PARAM, {method: 'removeAssignment', params: {permissionSetId: permissionSetId, userId: userId}})

        return this.permissionSetManager.removeAssignment(permissionSetId, userId);
    }
}