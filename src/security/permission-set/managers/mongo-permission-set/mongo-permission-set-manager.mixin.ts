import {Injectable, mixin} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {PermissionSetDto} from "../../../../entities";
import {PermissionSet} from "../../../../entities";
import {PermissionSetTypes} from "../../../../entities";
import {ObjectService} from "../../../../common";
import {DatabaseConnectionTypeEnum, isHasEmpty, MongoManager} from "@asemin/nestjs-utils";
import IPermissionSetManager from "../permission-set.manager.interface";

export const MongoPermissionSetManagerMixin = (type?: PermissionSetTypes): any => {

    @Injectable()
    class MongoPermissionSetManager extends MongoManager implements IPermissionSetManager {
        constructor(
            @InjectModel(PermissionSet.name) private readonly permissionSetModel: Model<PermissionSet>,
            private objectService: ObjectService
        ) {
            super(DatabaseConnectionTypeEnum.INMOST);
        }

        permissionSetType = 'type';

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

            return permissionSet ? new PermissionSetDto(permissionSet) : null;
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

            return permissionSetsForUser?.map(ps => ps._id.toString());
        }


        async create(permissionSet: PermissionSetDto): Promise<PermissionSetDto> {
            if (!permissionSet) return null;

            const newPermissionSet = await this.permissionSetModel.create(
                [permissionSet],
                {session: this.getSession()}
            );

            return permissionSet ? new PermissionSetDto(permissionSet) : null;
        }


        async assignUser(permissionSetId: string, userId: string): Promise<PermissionSetDto> {
            if (isHasEmpty(permissionSetId, userId)) return null;

            const permissionSet = await this.permissionSetModel.findByIdAndUpdate(
                permissionSetId,
                {$push: {assignees: userId}},
                {new: true, session: this.getSession()}
            );

            return permissionSet ? new PermissionSetDto(permissionSet) : null;
        }

        async removeAssignment(permissionSetId: string, userId: string): Promise<PermissionSetDto> {
            if (isHasEmpty(permissionSetId, userId)) return null;

            const permissionSet = await this.permissionSetModel.findByIdAndUpdate(
                permissionSetId,
                {$pull: {assignees: userId}},
                {new: true, session: this.getSession()}
            );

            return permissionSet ? new PermissionSetDto(permissionSet) : null;
        }

        async removeAssignments(permissionSetIds: string[], userId: string): Promise<void> {
            if (isHasEmpty(permissionSetIds, userId)) return null;

            await this.permissionSetModel.updateMany(
                {_id: {$in: permissionSetIds}},
                {$pull: {assignees: userId}},
                {new: true, session: this.getSession()}
            );
        }

        private createFilterWithType = (filter: any) => this.objectService.addProperty(this.permissionSetType, type, filter);
    }

    return mixin(MongoPermissionSetManager);
}