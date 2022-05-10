import {Injectable, mixin} from "@nestjs/common";
import {PermissionSetAllManager} from "./managers";
import {PermissionSetDto} from "../../entities";
import {isHasEmpty, throwException} from "@asemin/nestjs-utils";
import {API_ERROR_CODES} from "@jira-killer/constants";

export const PermissionSetServiceMixin = (permissionManager: PermissionSetAllManager): any => {

    @Injectable()
    class PermissionSetService {
        async getAll(): Promise<PermissionSetDto[]> {
            return permissionManager.getAll();
        }

        async getByName(name: string): Promise<PermissionSetDto> {
            if (!name) throwException(API_ERROR_CODES.COMMON.EMPTY_PARAM, {method: 'getByName', params: {name: name}})

            return permissionManager.getByName(name);
        }

        async getByUserId(userId: string): Promise<PermissionSetDto[]> {
            if (!userId) throwException(API_ERROR_CODES.COMMON.EMPTY_PARAM, {
                method: 'getByUserId',
                params: {userId: userId}
            })

            return permissionManager.getByUserId(userId);
        }

        async getIdsByUserId(userId: string): Promise<String[]> {
            if (!userId) throwException(API_ERROR_CODES.COMMON.EMPTY_PARAM, {
                method: 'getIdsByUserId',
                params: {userId: userId}
            })

            return permissionManager.getIdsByUserId(userId);
        }

        async create(permissionSet: PermissionSetDto): Promise<PermissionSetDto> {
            if (!permissionSet) throwException(API_ERROR_CODES.COMMON.EMPTY_PARAM, {
                method: 'create',
                params: {permissionSet: permissionSet}
            })

            return permissionManager.create(permissionSet);
        }

        async assignUser(permissionSetId: string, userId: string): Promise<PermissionSetDto> {
            if (isHasEmpty(permissionSetId, userId)) throwException(API_ERROR_CODES.COMMON.EMPTY_PARAM, {
                method: 'assignUser',
                params: {permissionSetId: permissionSetId, userId: userId}
            })

            return permissionManager.assignUser(permissionSetId, userId);
        }

        async removeAssignment(permissionSetId: string, userId: string): Promise<PermissionSetDto> {
            if (isHasEmpty(permissionSetId, userId)) throwException(API_ERROR_CODES.COMMON.EMPTY_PARAM, {
                method: 'removeAssignment',
                params: {permissionSetId: permissionSetId, userId: userId}
            })

            return permissionManager.removeAssignment(permissionSetId, userId);
        }

        async removeAssignments(permissionSetIds: string[], userId: string): Promise<void> {
            if (isHasEmpty(permissionSetIds, userId)) throwException(API_ERROR_CODES.COMMON.EMPTY_PARAM, {
                method: 'removeAssignments',
                params: {permissionSetIds: permissionSetIds, userId: userId}
            })

            return permissionManager.removeAssignments(permissionSetIds, userId);
        }
    }

    return mixin(PermissionSetService);
}
