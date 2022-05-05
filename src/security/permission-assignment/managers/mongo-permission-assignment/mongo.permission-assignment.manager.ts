import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import IPermissionAssignmentManager from "../permission-assignment.manager.interface";
import {DatabaseConnectionTypeEnum, isHasEmpty, MongoManager} from "@asemin/nestjs-utils";
import {PermissionAssignmentDto} from "../../../../entities/inmost/permission-assignment/permission-assignment.dto";
import {PermissionAssignment} from "../../../../entities/inmost/permission-assignment/permission-assignment.schema";

@Injectable()
export class MongoPermissionAssignmentManager extends MongoManager implements IPermissionAssignmentManager {
    constructor(@InjectModel(PermissionAssignment.name) private readonly permissionAssignmentModel: Model<PermissionAssignment>,) {
        super(DatabaseConnectionTypeEnum.INMOST);
    }

    async getAll(): Promise<PermissionAssignmentDto[]> {
        const allPermissions = await this.permissionAssignmentModel.find({}, {}, {session: this.getSession()})

        return allPermissions?.map(permission => new PermissionAssignmentDto(permission));
    }

    async getAllByPermissionSets(permissionSets: string[]): Promise<PermissionAssignmentDto[]> {
        if (!permissionSets) return null;

        let permissionAssignments = await this.permissionAssignmentModel.find({$in: {permissionSet: permissionSets}}, {}, {session: this.getSession()})

        return permissionAssignments?.map(permissionAssignment => new PermissionAssignmentDto(permissionAssignment));
    }

    async getByPermissionAndPermissionSets(permissionId: string, permissionSetIds: string[]): Promise<PermissionAssignmentDto> {
        if (isHasEmpty(permissionId, permissionSetIds)) return null;

        const permissionAssignment = await this.permissionAssignmentModel.findOne({
            permission: permissionId,
            permissionSet: {$in: permissionSetIds}
        }, {}, {session: this.getSession()});

        return permissionAssignment ? new PermissionAssignmentDto(permissionAssignment) : null;
    }

    async isExist(permissionSetId: string, permissionId: string): Promise<boolean>{
        if (isHasEmpty(permissionId, permissionSetId)) return null;

        const permissionAssignment = await this.permissionAssignmentModel.find({permission: permissionId, permissionSet: permissionSetId}, {}, {session: this.getSession()});

        return !!permissionAssignment;
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

        const deletedAssignment = await this.permissionAssignmentModel.findByIdAndDelete(id, {session: this.getSession()});

        return !!deletedAssignment;
    }
}