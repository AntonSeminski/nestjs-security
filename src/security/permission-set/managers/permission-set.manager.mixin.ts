import {Injectable, mixin} from '@nestjs/common';
import {PermissionSetDto} from "../../../entities";
import {isHasEmpty, throwException} from "@asemin/nestjs-utils";
import {API_ERROR_CODES} from "@jira-killer/constants";
import IPermissionSetManager from "./permission-set.manager.interface";
import {MongoPermissionSetManager} from "./mongo-permission-set";

//todo interface is not applied for some reason ???
export const PermissionSetManagerMixin = (mongoManager: MongoPermissionSetManager): any => {
    @Injectable()
    class PermissionSetManager implements IPermissionSetManager {
        async getAll(): Promise<PermissionSetDto[]> {
            return mongoManager.getAll();
        }

        async getByName(name: string): Promise<PermissionSetDto> {
            if (!name) throwException(API_ERROR_CODES.COMMON.EMPTY_PARAM, {method: 'getByName', params: {name: name}})

            return mongoManager.getByName(name);
        }

        async getByUserId(userId: string): Promise<PermissionSetDto[]> {
            if (!userId) throwException(API_ERROR_CODES.COMMON.EMPTY_PARAM, {
                method: 'getByUserId',
                params: {userId: userId}
            })

            return mongoManager.getByUserId(userId);
        }

        getIdsByUserId(userId: string): Promise<String[]> {
            if (!userId) throwException(API_ERROR_CODES.COMMON.EMPTY_PARAM, {
                method: 'getIdsByUserId',
                params: {userId: userId}
            })

            return mongoManager.getIdsByUserId(userId);
        }

        async create(permissionSet: PermissionSetDto): Promise<PermissionSetDto> {
            if (!permissionSet) throwException(API_ERROR_CODES.COMMON.EMPTY_PARAM, {
                method: 'create',
                params: {permissionSet: permissionSet}
            })

            return mongoManager.create(permissionSet);
        }


        async assignUser(permissionSetId: string, userId: string): Promise<PermissionSetDto> {
            if (isHasEmpty(permissionSetId, userId)) throwException(API_ERROR_CODES.COMMON.EMPTY_PARAM, {
                method: 'assignUser',
                params: {permissionSetId: permissionSetId, userId: userId}
            })

            return mongoManager.assignUser(permissionSetId, userId);
        }

        async removeAssignment(permissionSetId: string, userId: string): Promise<PermissionSetDto> {
            if (isHasEmpty(permissionSetId, userId)) throwException(API_ERROR_CODES.COMMON.EMPTY_PARAM, {
                method: 'removeAssignment',
                params: {permissionSetId: permissionSetId, userId: userId}
            })

            return mongoManager.removeAssignment(permissionSetId, userId);
        }

        async removeAssignments(permissionSetIds: string[], userId: string): Promise<void> {
            if (isHasEmpty(permissionSetIds, userId)) throwException(API_ERROR_CODES.COMMON.EMPTY_PARAM, {
                method: 'removeAssignments',
                params: {permissionSetIds: permissionSetIds, userId: userId}
            })

            return mongoManager.removeAssignments(permissionSetIds, userId);
        }
    }

    return mixin(PermissionSetManager)
}