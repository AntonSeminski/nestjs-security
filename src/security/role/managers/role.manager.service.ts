import { BadRequestException, Injectable } from '@nestjs/common';
import { MongoRoleManager } from './mongo-role/mongo.role.manager';
import IRoleManager from './role.manager.interface';
import {RoleDto} from "../../../entities/inmost/role/role.dto";
import {isHasEmpty, throwException} from "@asemin/nestjs-utils";
import {API_ERROR_CODES} from '@jira-killer/constants'


@Injectable()
export class RoleManager implements IRoleManager {
  constructor(private roleManager: MongoRoleManager) {}

  async getHierarchy(): Promise<any> {
    return this.roleManager.getHierarchy();
  }

  async getAll(): Promise<RoleDto[]> {
    return this.roleManager.getAll();
  }

  async getParentRoles(role: RoleDto): Promise<RoleDto[]>{
    if (isHasEmpty(role)) throwException(API_ERROR_CODES.COMMON.EMPTY_PARAM, {method: 'getParentRoles', fields: {role}})

    return this.roleManager.getParentRoles(role);
  }

  async getByName(roleName: string): Promise<RoleDto> {
    if (!roleName) throwException(API_ERROR_CODES.COMMON.EMPTY_PARAM, {method: 'getByName', params: {roleName: roleName}});

    return this.roleManager.getByName(roleName);
  }

  async getById(id: string): Promise<RoleDto> {
    if (isHasEmpty(id)) throwException(API_ERROR_CODES.COMMON.EMPTY_PARAM, {method: 'getById', params: {id}})

    return this.roleManager.getById(id);
  }

  async create(role: RoleDto): Promise<RoleDto>{
    if (!role) throwException(API_ERROR_CODES.COMMON.EMPTY_PARAM, {method: 'create', params: {role: role}})

    return this.roleManager.create(role);
  }

  async update(role: RoleDto): Promise<RoleDto>{
    if (!role) throwException(API_ERROR_CODES.COMMON.EMPTY_PARAM, {method: 'update', params: {role: role}})

    return this.roleManager.update(role);
  }
}