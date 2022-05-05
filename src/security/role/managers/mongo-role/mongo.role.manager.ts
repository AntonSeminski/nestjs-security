import {BadRequestException, Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {Role} from "../../../../entities/inmost/role/role.schema";
import IRoleManager from "../role.manager.interface";
import {RoleDto} from "../../../../entities/inmost/role/role.dto";
import {isHasEmpty, throwException} from "@asemin/nestjs-utils";
import {API_ERROR_CODES} from '@jira-killer/constants'
import {DatabaseConnectionTypeEnum, MongoManager} from "@asemin/nestjs-utils";

@Injectable()
export class MongoRoleManager extends MongoManager implements IRoleManager{
    constructor(@InjectModel(Role.name) private readonly roleModel: Model<Role>) {
        super(DatabaseConnectionTypeEnum.INMOST);
    }

    async getHierarchy(): Promise<any> {
        const allRoles = await this.getAll();
        const headRole = allRoles.find(role => role.parent === null || role.parent === undefined);

        return this.createHierarchy(headRole, allRoles)
    }

    async getParentRoles(role: RoleDto) {
        if (isHasEmpty(role)) return null;

        return this.getAbove(role.parentId, [], await this.getAll());
    }

    async getAll(): Promise<RoleDto[]> {
        const allRoles = await this.roleModel
            .find({}, {}, {session: this.getSession()})
            .populate('parent');

        return allRoles?.map(role => new RoleDto(role));
    }

    async getByName(roleName: string): Promise<RoleDto> {
        if (!roleName) return null;

        const role = await this.roleModel
            .findOne({name: roleName}, {}, {session: this.getSession()})
            .populate('parent');


        return role === null ? null : new RoleDto(role);
    }

    async getById(id: string): Promise<RoleDto> {
        if (isHasEmpty(id)) return null;

        const role = await this.roleModel
            .findById(id, {}, {session: this.getSession()})
            .populate('parent');

        return role === null ? null : new RoleDto(role);
    }

    async create(role: RoleDto): Promise<RoleDto> {
        if (!role) return null;

        let newRole = await this.roleModel.create([role], {session: this.getSession()});

        return newRole == null ? null : new RoleDto(newRole[0]);
    }

    async update(role: RoleDto): Promise<RoleDto> {
        if (!role) return null;

        let updatedRole = await this.roleModel.findOneAndUpdate(
            {name: role.name},
            {...role},
            {new: true, session: this.getSession()})
        updatedRole = await updatedRole?.populate('parent');

        return updatedRole == null ? null : new RoleDto(updatedRole);
    }

    private getAbove(parentId, parents: RoleDto[], roles: RoleDto[]) {
        const parent = roles.find(role => role._id.toString() === parentId);

        if (parent) {
            parents.push(parent);
            parents = this.getAbove(parent.parentId, parents, roles);
        }

        return parents;
    }

    private createHierarchy = (parent, roles) => {
        const children = roles.filter(role => parent._id.toString() === role.parentId?.toString());
        const formedChildren = []; // :(

        if (children?.length > 0)
            children.forEach(child => formedChildren.push(this.createHierarchy(child, roles)));

        return {_id: parent._id, name: parent.name, children: formedChildren, level: parent.level};
    };
}