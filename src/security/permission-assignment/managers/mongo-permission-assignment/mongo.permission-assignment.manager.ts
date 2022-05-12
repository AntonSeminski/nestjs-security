import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import IPermissionAssignmentManager from "../permission-assignment.manager.interface";
import {DatabaseConnectionTypeEnum, isHasEmpty, MongoManager} from "@asemin/nestjs-utils";
import {PermissionAssignmentDto} from "../../../../entities";
import {PermissionAssignment} from "../../../../entities";

@Injectable()
export class MongoPermissionAssignmentManager extends MongoManager implements IPermissionAssignmentManager {
    constructor(@InjectModel(PermissionAssignment.name) private readonly permissionAssignmentModel: Model<PermissionAssignment>,) {
        super(DatabaseConnectionTypeEnum.INMOST);
    }

    async getAll(): Promise<PermissionAssignmentDto[]> {
        const allPermissions = await this.permissionAssignmentModel
            .find()
            .session(this.getSession());

        return allPermissions?.map(permission => new PermissionAssignmentDto(permission));
    }

    async getAllByPermissionSetIds(permissionSets: string[]): Promise<PermissionAssignmentDto[]> {
        if (!permissionSets) return null;

        let permissionAssignments = await this.permissionAssignmentModel
            .find({permissionSet: {$in: permissionSets}})
            .session(this.getSession());

        return permissionAssignments?.map(permissionAssignment => new PermissionAssignmentDto(permissionAssignment));
    }

    async getByPermissionIdAndPermissionSetIds(permissionId: string, permissionSetIds: string[]): Promise<PermissionAssignmentDto> {
        if (isHasEmpty(permissionId, permissionSetIds)) return null;

        const permissionAssignment = await this.permissionAssignmentModel
            .findOne({
                permission: permissionId,
                permissionSet: {$in: permissionSetIds}
            })
            .session(this.getSession());

        return permissionAssignment ? new PermissionAssignmentDto(permissionAssignment) : null;
    }

    async getByPermissionIdsAndPermissionSetIds(permissionIds: string[], permissionSetIds: string[]): Promise<PermissionAssignmentDto[]> {
        // if (isHasEmpty(permissionIds, ...permissionSetIds)) throwEmptyParam(null);

        const permissionAssignments = await this.permissionAssignmentModel
            .find({
                permission: {$in: permissionIds},
                permissionSet: {$in: permissionSetIds}
            })
            .session(this.getSession());

        return permissionAssignments?.map(assignment => new PermissionAssignmentDto(assignment));
    }

    async create(permission: PermissionAssignmentDto): Promise<PermissionAssignmentDto> {
        if (isHasEmpty(permission)) return null;

        let newPermissionAssignment = await this.permissionAssignmentModel.create([permission], {session: this.getSession()})

        return newPermissionAssignment ? new PermissionAssignmentDto(newPermissionAssignment) : null;
    }

    async createMany(permissionAssignments: PermissionAssignmentDto[]): Promise<PermissionAssignmentDto[]> {
        if (isHasEmpty(permissionAssignments)) return null;

        const newPermissionAssignments = await this.permissionAssignmentModel.create(permissionAssignments, {session: this.getSession()});

        return  newPermissionAssignments?.map(permissionAssignment => new PermissionAssignmentDto(permissionAssignment));
    }

    async deleteById(id: string): Promise<boolean> {
        if (isHasEmpty(id)) return false;

        const deletedAssignment = await this.permissionAssignmentModel
            .findByIdAndDelete(id)
            .session(this.getSession());

        return !!deletedAssignment;
    }
}