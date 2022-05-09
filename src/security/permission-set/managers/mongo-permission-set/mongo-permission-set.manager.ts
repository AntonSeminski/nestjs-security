import {BadRequestException, Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {PermissionSetDto} from "../../../../entities/inmost/permission-set/pemrission-set.dto";
import {PermissionSet} from "../../../../entities/inmost/permission-set/permissions-set.schema";
import IPermissionSetManager from "../permission-set.manager.interface";
import {PermissionSetTypes} from "../../../../entities/inmost/permission-set/permissions-set.types";
import {ObjectService} from "../../../../common/services/object/object.service";
import {DatabaseConnectionTypeEnum, isHasEmpty, MongoManager} from "@asemin/nestjs-utils";

@Injectable()
export class MongoPermissionSetManager extends MongoManager implements IPermissionSetManager {
    constructor(
        @InjectModel(PermissionSet.name) private readonly permissionSetModel: Model<PermissionSet>,
        private objectService: ObjectService
    ) {
        super(DatabaseConnectionTypeEnum.INMOST);
    }

    TYPE = 'type'
    static type: PermissionSetTypes;

    async getAll(): Promise<PermissionSetDto[]> {
        const filter = this.createFilterWithType({})

        const allPermissionSets = await this.permissionSetModel
            .find(filter)
            .session(this.getSession());

        return allPermissionSets?.map(ps => new PermissionSetDto(ps));
    }

    async getByName(name: string): Promise<PermissionSetDto> {
        if (!name) return null;

        const filter = this.createFilterWithType({name});

        const permissionSet = await this.permissionSetModel
            .findOne(filter)
            ?.session(this.getSession())
            ?.populate('assignees')

        return permissionSet == null ? null : new PermissionSetDto(permissionSet);
    }

    async getByUserId(userId: string): Promise<PermissionSetDto[]> {
        if (!userId) return null;

        const filter = this.createFilterWithType({'assignees': userId});

        const permissionSetsForUser = await this.permissionSetModel
            .find(filter)
            .session(this.getSession());

        return permissionSetsForUser?.map(ps => new PermissionSetDto(ps));
    }

    async getIdsByUserId(userId: string): Promise<String[]> {
        if (!userId) return null;

        const filter = this.createFilterWithType({'assignees': userId});

        const permissionSetsForUser = await this.permissionSetModel
            .find(filter)
            .session(this.getSession());

        return permissionSetsForUser.map(ps => ps._id.toString());
    }


    async create(permissionSet: PermissionSetDto): Promise<PermissionSetDto> {
        if (!permissionSet) return null;

        const newPermissionSet = await this.permissionSetModel.create(
            [permissionSet],
            {session: this.getSession()}
        );

        return newPermissionSet == null ? null : new PermissionSetDto(newPermissionSet[0]);
    }


    async assignUser(permissionSetId: string, userId: string) {
        if (isHasEmpty(permissionSetId, userId)) return null;

        const permissionSet = await this.permissionSetModel.findByIdAndUpdate(
            permissionSetId,
            {$push: {assignees: userId}},
            {new: true, session: this.getSession()}
        );

        return permissionSet == null ? null : new PermissionSetDto(permissionSet);
    }

    async removeAssignment(permissionSetId: string, userId: string) {
        if (isHasEmpty(permissionSetId, userId)) return null;

        const permissionSet = await this.permissionSetModel.findByIdAndUpdate(
            permissionSetId,
            {$pull: {assignees: userId}},
            {new: true, session: this.getSession()}
        );

        return permissionSet == null ? null : new PermissionSetDto(permissionSet);
    }

    private createFilterWithType = (filter: any) => this.objectService.addProperty(this.TYPE, MongoPermissionSetManager.type, filter);

}