import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import IPermissionManager from "../permission.manager.interface";
import {EDatabaseConnectionType, isHasEmpty, MongoManager, throwException} from "@asemin/nestjs-utils";
import {PermissionDto} from "../../dto";
import {UpdatePermissionDto} from "../../dto";
import {AccessLevels, Permission} from "../../../../entities";
import {API_ERROR_CODES, EPermissionTypes} from "@jira-killer/constants";
import {EObjectAccessType} from "../../../../common/types/object-access.type";
import {FieldPermissionDto} from "../../dto/field-permission.dto";

@Injectable()
export class MongoPermissionManager extends MongoManager implements IPermissionManager {
    constructor(
        @InjectModel(Permission.name) private readonly permissionModel: Model<Permission>,
    ) {
        super(EDatabaseConnectionType.Inmost);
    }

    async getAll(): Promise<PermissionDto[]> {
        const allPermissions = await this.permissionModel.find({}, {}, {session: this.getSession()})

        return allPermissions?.map(permission => new PermissionDto(permission));
    }

    async getAllByIds(ids: string[]): Promise<PermissionDto[]> {
        if (!ids) return null;

        const permissions = await this.permissionModel.find({_id: {$in: ids}}, {}, {session: this.getSession()});

        return permissions?.map(permission => new PermissionDto(permission));
    }

    async getByName(apiName: string): Promise<PermissionDto> {
        if (isHasEmpty(apiName)) return null;

        const permission = await this.permissionModel.findOne({apiName}, {}, {session: this.getSession()});

        return !!permission ? new PermissionDto(permission) : null;
    }

    async getByNameAndType(apiName: string, type:string): Promise<PermissionDto> {
        if (isHasEmpty(apiName, type)) return null;

        const permission = await this.permissionModel.findOne({apiName, type}, {}, {session: this.getSession()});

        return permission ? new PermissionDto(permission) : null;
    }

    async getObjectPermissions(objectName: string): Promise<PermissionDto[]> {
        if (!objectName) return null;

        const objectPermissionTypes = Object.values(EObjectAccessType).map(accessType => `${objectName}.${accessType}`);
        const objectPermissions = await this.permissionModel
            .find({
                apiName: { $in: objectPermissionTypes },
                type: EPermissionTypes.Object
            });

        return objectPermissions?.map(permission => new PermissionDto(permission));
    }

    async getFieldPermissions(objectName: string, fieldNames: Array<string>): Promise<Array<FieldPermissionDto>> {
        if (isHasEmpty(objectName, fieldNames)) return null;

        const fieldPermissionTypes = [];

        fieldNames.forEach(fieldName => {
            fieldPermissionTypes.push(`${objectName}.${fieldName}.${AccessLevels.READ}`);
            fieldPermissionTypes.push(`${objectName}.${fieldName}.${AccessLevels.EDIT}`);
        });

        const fieldPermissions = await this.permissionModel
            .find({
                apiName: { $in: fieldPermissionTypes },
                type: 'Field'
            });

        return fieldPermissions?.map(fieldPermission => new FieldPermissionDto(fieldPermission));
    }

    async getObjectPermissionByAccessLevel(objectName: string, accessLevel: string): Promise<PermissionDto> {
        if (isHasEmpty(objectName, accessLevel)) return null;

        const objectPermission = await this.permissionModel
            .findOne({apiName: `${objectName}.${accessLevel}`, type: EPermissionTypes.Object})
            .session(this.getSession());

        return  objectPermission ? new PermissionDto(objectPermission) : null;
    }

    async create(permission: PermissionDto): Promise<PermissionDto> {
        if (isHasEmpty(permission)) return null;

        let newPermission = await this.permissionModel.create([permission], {session: this.getSession()})

        return newPermission ? new PermissionDto(newPermission[0]) : null;
    }

    async createMany(permissions: PermissionDto[]): Promise<PermissionDto[]> {
        if (isHasEmpty(permissions)) return null;

        const newPermissions = await this.permissionModel.create(permissions, {session: this.getSession()});

        return newPermissions?.map(permission => new PermissionDto(permission));
    }

    async update(permission: UpdatePermissionDto): Promise<PermissionDto> {
        if (isHasEmpty(permission)) return null;

        let updatedPermission = await this.permissionModel.findByIdAndUpdate(
            permission._id,
            {...permission},
            {new: true, session: this.getSession()}
        );

        return updatedPermission ? new PermissionDto(updatedPermission) : null;
    }

    async deleteById(id: string): Promise<boolean> {
        if (isHasEmpty(id)) return null;

        const deletedAssignment = await this.permissionModel.findByIdAndDelete(id, {session: this.getSession()});

        return !!deletedAssignment;
    }
}