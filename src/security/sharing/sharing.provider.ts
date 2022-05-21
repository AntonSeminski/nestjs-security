import {Injectable} from "@nestjs/common";
import {SharingManager} from "./managers";
import {isHasEmpty, throwException} from "@asemin/nestjs-utils";
import {SharingDto} from "../../entities";
import {API_ERROR_CODES} from '@jira-killer/constants';
import {AccessLevels} from "../../entities";
import {SharingTypes} from "../../entities";
import {UpdateSharingDto} from "./dto/update-sharing.dto";

@Injectable()
export class SharingService {
    constructor(private sharingManager: SharingManager) {
    }

    async getAll(): Promise<SharingDto[]> {
        return this.sharingManager.getAll();
    }

    async getAllByType(type: string): Promise<SharingDto[]> {
        if (isHasEmpty(type)) throwException(API_ERROR_CODES.COMMON.EMPTY_PARAM, {method: 'getAllByType', fields: {type: type}})

        return this.sharingManager.getAllByType(type);
    }

    async getAllByEntity(entity: string): Promise<SharingDto[]> {
        if (isHasEmpty(entity)) throwException(API_ERROR_CODES.COMMON.EMPTY_PARAM, {method: 'getAllByEntity', fields: {entity: entity}})

        return this.sharingManager.getAllByEntity(entity);
    }

    async getAllByEntities(entities: string[]): Promise<SharingDto[]> {
        if (isHasEmpty(entities)) throwException(API_ERROR_CODES.COMMON.EMPTY_PARAM, {method: 'getAllByEntities', fields: {entities: entities}})

        return this.sharingManager.getAllByEntities(entities);
    }

    async getByEntitiesAndShareTo(entities: string[], shareTo: string): Promise<SharingDto[]> {
        if (isHasEmpty(entities, shareTo)) throwException(API_ERROR_CODES.COMMON.EMPTY_PARAM, {method: 'getByEntitiesAndShareTo', fields: {entities: entities}})

        return this.sharingManager.getByEntitiesAndShareTo(entities, shareTo);
    }

    async getByEntitiesAndManyShareTo(entities: string[], shareTo: string[]): Promise<SharingDto[]> {
        if (isHasEmpty(entities, shareTo)) throwException(API_ERROR_CODES.COMMON.EMPTY_PARAM, {method: 'getByEntitiesAndManyShareTo', fields: {entities: entities}
        })

        return this.sharingManager.getByEntitiesAndManyShareTo(entities, shareTo);
    }

    async getByEntityAndType(entity: string, type: string): Promise<SharingDto[]> {
        if (isHasEmpty(entity, type))
            throwException(API_ERROR_CODES.COMMON.EMPTY_PARAM, {method: 'getByEntityAndType', fields: {entity: entity, type: type}})

        return this.sharingManager.getByEntityAndType(entity, type);
    }

    async getByEntitiesAndType(entities: string[], type: string): Promise<SharingDto[]> {
        if (isHasEmpty(entities, type)) throwException(API_ERROR_CODES.COMMON.EMPTY_PARAM, {method: 'getByEntitiesAndType', fields: {entities: entities, type: type}})

        return this.sharingManager.getByEntitiesAndType(entities, type);
    }

    async getOrgWide(entityName: string): Promise<SharingDto> {
        if (isHasEmpty(entityName)) throwException(API_ERROR_CODES.COMMON.EMPTY_PARAM, {method: 'checkOrgWide', fields: {entityName: entityName}});

        return this.sharingManager.getOrgWide(entityName);
    }

    async create(sharing: SharingDto): Promise<SharingDto> {
        if (isHasEmpty(sharing)) throwException(API_ERROR_CODES.COMMON.EMPTY_PARAM, {method: 'create', fields: {sharing: sharing}});

        return this.sharingManager.create(sharing);
    }

    async createMany(sharing: SharingDto[]): Promise<SharingDto[]> {
        if (isHasEmpty(sharing)) throwException(API_ERROR_CODES.COMMON.EMPTY_PARAM, {method: 'createMany', fields: {sharing: sharing}});

        return this.sharingManager.createMany(sharing);
    }

    async update(sharing: UpdateSharingDto): Promise<SharingDto> {
        if (isHasEmpty(sharing)) throwException(API_ERROR_CODES.COMMON.EMPTY_PARAM, {method: 'update', fields: {sharing: sharing}});

        return this.sharingManager.update(sharing);
    }

    async deleteById(id: string): Promise<boolean> {
        if (isHasEmpty(id)) throwException(API_ERROR_CODES.COMMON.EMPTY_PARAM, {method: 'deleteById', fields: {id: id}});

        return this.sharingManager.deleteById(id);
    }

    async deleteAllByEntity(entityId: string): Promise<boolean> {
        if (isHasEmpty(entityId)) throwException(API_ERROR_CODES.COMMON.EMPTY_PARAM, {method: 'deleteAllByEntity', fields: {entityId: entityId}});

        return this.sharingManager.deleteAllByEntity(entityId);
    }

    async deleteAutomatedByEntity(entityId: string): Promise<void> {
        if (isHasEmpty(entityId)) throwException(API_ERROR_CODES.COMMON.EMPTY_PARAM, {method: 'deleteAutomatedByEntity', fields: {entityId: entityId}});

        return this.sharingManager.deleteAutomatedByEntity(entityId);
    }

    async createAutomatedSharing(entity) {
        if (!entity?.owner) return;

        const automatedSharing: SharingDto[] = [];

        if (entity.owner)
            automatedSharing.push(await this.createOwnerSharing(entity, entity.owner));
        if (entity.roleLevel)
            automatedSharing.push(await this.createRoleSharing(entity, entity.roleLevel, AccessLevels.EDIT));

        await this.sharingManager.createMany(automatedSharing);
    }

    async createRoleSharing(entity: any, roleLevel: number, accessLevel: AccessLevels | string): Promise<SharingDto> {
        if (isHasEmpty(entity, roleLevel, accessLevel)) throwException(API_ERROR_CODES.COMMON.EMPTY_PARAM, {method: 'createRoleSharing', params: {entity, roleLevel, accessLevel}});

        return new SharingDto({
            entity: entity._id,
            type: SharingTypes.ROLE,
            accessLevel: accessLevel,
            sharedTo: roleLevel
        });
    }

    createOwnerSharing(entity: any, ownerId: string): SharingDto {
        if (!entity) throwException(API_ERROR_CODES.COMMON.EMPTY_PARAM, {method: 'createOwnerSharing', fields: {entity}})

        return {
            entity: entity._id,
            type: SharingTypes.OWNER,
            accessLevel: AccessLevels.EDIT,
            sharedTo: ownerId
        };
    }
}