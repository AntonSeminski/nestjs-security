import {Injectable, mixin} from "@nestjs/common";
import {PermissionSetManager} from "../managers";
import {PermissionSetDto, PermissionSetTypes} from "../../../entities";
import {isHasEmpty, throwException} from "@asemin/nestjs-utils";
import {API_ERROR_CODES} from "@jira-killer/constants";

export const PermissionSetProvider = (type?: PermissionSetTypes): any => {
    class Manager extends PermissionSetManager(type) {}

    @Injectable()
    class PermissionSetService {
        constructor(private permissionSetManager: Manager) {}

        async getAll(): Promise<PermissionSetDto[]> {
            return this.permissionSetManager.getAll();
        }

        async getByName(name: string): Promise<PermissionSetDto> {
            if (!name) throwException(API_ERROR_CODES.COMMON.EMPTY_PARAM, {method: 'getByName', params: {name: name}})

            return this.permissionSetManager.getByName(name);
        }

        async getByUserId(userId: string): Promise<PermissionSetDto[]> {
            if (!userId) throwException(API_ERROR_CODES.COMMON.EMPTY_PARAM, {
                method: 'getByUserId',
                params: {userId: userId}
            })

            return this.permissionSetManager.getByUserId(userId);
        }

        async getIdsByUserId(userId: string): Promise<String[]> {
            if (!userId) throwException(API_ERROR_CODES.COMMON.EMPTY_PARAM, {
                method: 'getIdsByUserId',
                params: {userId: userId}
            })

            return this.permissionSetManager.getIdsByUserId(userId);
        }

        async create(permissionSet: PermissionSetDto): Promise<PermissionSetDto> {
            if (!permissionSet) throwException(API_ERROR_CODES.COMMON.EMPTY_PARAM, {
                method: 'create',
                params: {permissionSet: permissionSet}
            })

            return this.permissionSetManager.create(permissionSet);
        }

        async assignUser(permissionSetId: string, userId: string): Promise<PermissionSetDto> {
            if (isHasEmpty(permissionSetId, userId)) throwException(API_ERROR_CODES.COMMON.EMPTY_PARAM, {
                method: 'assignUser',
                params: {permissionSetId: permissionSetId, userId: userId}
            })

            return this.permissionSetManager.assignUser(permissionSetId, userId);
        }

        async removeAssignment(permissionSetId: string, userId: string): Promise<PermissionSetDto> {
            if (isHasEmpty(permissionSetId, userId)) throwException(API_ERROR_CODES.COMMON.EMPTY_PARAM, {
                method: 'removeAssignment',
                params: {permissionSetId: permissionSetId, userId: userId}
            })

            return this.permissionSetManager.removeAssignment(permissionSetId, userId);
        }

        async removeAssignments(permissionSetIds: string[], userId: string): Promise<void> {
            if (isHasEmpty(permissionSetIds, userId)) throwException(API_ERROR_CODES.COMMON.EMPTY_PARAM, {
                method: 'removeAssignments',
                params: {permissionSetIds: permissionSetIds, userId: userId}
            })

            return this.permissionSetManager.removeAssignments(permissionSetIds, userId);
        }
    }

    return mixin(PermissionSetService);
}