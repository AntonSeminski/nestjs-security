import {Injectable} from "@nestjs/common";
import {PermissionAssignmentManager} from "./managers/permission-assignment.manager.service";
import {isHasEmpty, throwException} from "@asemin/nestjs-utils";
import {PermissionAssignmentDto} from "../../entities/inmost/permission-assignment/permission-assignment.dto";
import {API_ERROR_CODES} from '@jira-killer/constants'

@Injectable()
export class PermissionAssignmentService {
    constructor(private permissionAssignmentManager: PermissionAssignmentManager) {}

    async getAll(): Promise<PermissionAssignmentDto[]> {
        return this.permissionAssignmentManager.getAll();
    }

    async getAllByPermissionSets(permissionSets: string[]): Promise<PermissionAssignmentDto[]> {
        if (!permissionSets) throwException(API_ERROR_CODES.COMMON.EMPTY_PARAM, {method: 'getAllByPermissionSets', params: {permissionSets: permissionSets}});

        return this.permissionAssignmentManager.getAllByPermissionSets(permissionSets);
    }

    async getByPermissionAndPermissionSets(permissionId: string, permissionSetIds: string[]): Promise<PermissionAssignmentDto> {
        if (isHasEmpty(permissionId, permissionSetIds))
            throwException(API_ERROR_CODES.COMMON.EMPTY_PARAM, {method: 'getByPermissionAndPermissionSets', params: {permissionId: permissionId, permissionSetIds: permissionSetIds}});

        return this.permissionAssignmentManager.getByPermissionAndPermissionSets(permissionId, permissionSetIds);
    }

    async create(permissionAssignment: PermissionAssignmentDto): Promise<PermissionAssignmentDto> {
        if (isHasEmpty(permissionAssignment)) throwException(API_ERROR_CODES.COMMON.EMPTY_PARAM, {method: 'create', params: {permissionAssignment: permissionAssignment}});

        return this.permissionAssignmentManager.create(permissionAssignment);
    }

    async createMany(permissionAssignments: PermissionAssignmentDto[]): Promise<PermissionAssignmentDto[]> {
        if (isHasEmpty(permissionAssignments)) throwException(API_ERROR_CODES.COMMON.EMPTY_PARAM, {method: 'createMany', params: {permissionAssignments: permissionAssignments}});

        return this.permissionAssignmentManager.createMany(permissionAssignments);
    }

    async deleteById(id: string): Promise<boolean> {
        if (isHasEmpty(id)) throwException(API_ERROR_CODES.COMMON.EMPTY_PARAM, {method: 'deleteById', params: {id: id}});

        return this.permissionAssignmentManager.deleteById(id);
    }
}