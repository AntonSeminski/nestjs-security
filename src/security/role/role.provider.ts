import {BadRequestException, Injectable} from "@nestjs/common";
import {RoleManager} from "./managers";
import {RoleDto} from "../../entities";
import {isHasEmpty, throwException} from "@asemin/nestjs-utils";
import {API_ERROR_CODES} from '@jira-killer/constants'

@Injectable()
export class RoleService {
    constructor(private roleManager: RoleManager) {}

    async getHierarchy(): Promise<any> {
        return this.roleManager.getHierarchy();
    }

    async getAboveRoles(roleId: string): Promise<RoleDto[]> {
        if (!roleId) throwException(API_ERROR_CODES.COMMON.EMPTY_PARAM, {method: 'getAboveRoles', params: {roleId}});

        const currentRole = await this.getById(roleId);

        return this.roleManager.getParentRoles(currentRole);
    }

    async getAll(): Promise<RoleDto[]> {
        return this.roleManager.getAll();
    }

    async getByName(roleName: string): Promise<RoleDto>{
        if (!roleName) throwException(API_ERROR_CODES.COMMON.EMPTY_PARAM, {method: 'getByName', params: {roleName: roleName}});

        return this.roleManager.getByName(roleName);
    }

    async getById(id: string): Promise<RoleDto>{
        if (isHasEmpty(id)) throwException(API_ERROR_CODES.COMMON.EMPTY_PARAM, {method: 'getById', params: {id}})

        return this.roleManager.getById(id);
    }

    async create(role: RoleDto): Promise<RoleDto>{
        if (!role) throwException(API_ERROR_CODES.COMMON.EMPTY_PARAM, {method: 'create', params: {role: role}})

        if (role.parent) {
            const parentRole = await this.roleManager.getByName(role.parent);
            if (!parentRole) throwException(API_ERROR_CODES.ROLE.PARENT.NOT_FOUND);

            role.parent = parentRole._id;
            role.level = parentRole.level + 1;
        }

        return this.roleManager.create(role);
    }

    async update(role: RoleDto): Promise<RoleDto>{
        if (!role) throwException(API_ERROR_CODES.COMMON.EMPTY_PARAM, {method: 'update', params: {role: role}})

        if (role.parent) {
            const parentRole = await this.roleManager.getByName(role.parent);
            if (!parentRole) throw new BadRequestException('Parent role not found!');

            role.parent = parentRole._id;
        }

        return this.roleManager.update(role);
    }
}