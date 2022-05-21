import {Injectable} from '@nestjs/common';
import {MongoSharingManager} from './mongo-sharing';
import ISharingManager from "./sharing.manager.interface";
import {isHasEmpty, throwException} from "@asemin/nestjs-utils";
import {SharingDto, SharingTypes} from "../../../entities";
import {API_ERROR_CODES} from '@jira-killer/constants'

@Injectable()
export class SharingManager implements ISharingManager {
    constructor(private mongoSharingManager: MongoSharingManager) {
    }

    async getAll(): Promise<SharingDto[]> {
        return this.mongoSharingManager.getAll();
    }

    async getAllByType(type: string): Promise<SharingDto[]> {
        if (isHasEmpty(type)) throwException(API_ERROR_CODES.COMMON.EMPTY_PARAM, {method:'getAllByType', fields: {type}})

        return this.mongoSharingManager.getAllByType(type);
    }

    async getAllByEntity(entity: string): Promise<SharingDto[]> {
        if (isHasEmpty(entity)) throwException(API_ERROR_CODES.COMMON.EMPTY_PARAM, {method:'getAllByEntity', fields: {entity}})

        return this.mongoSharingManager.getAllByEntity(entity);
    }

    async getAllByEntities(entities: string[]): Promise<SharingDto[]> {
        if (isHasEmpty(entities)) throwException(API_ERROR_CODES.COMMON.EMPTY_PARAM, {method:'getAllByEntities', fields: {entities}})

        return this.mongoSharingManager.getAllByEntities(entities);
    }

    async getByEntitiesAndShareTo(entities: string[], shareTo: string): Promise<SharingDto[]> {
        if (isHasEmpty(entities, shareTo))
            throwException(API_ERROR_CODES.COMMON.EMPTY_PARAM, {method:'getByEntitiesAndShareTo', fields: {entities}})

        return this.mongoSharingManager.getByEntitiesAndShareTo(entities, shareTo);
    }

    async getByEntitiesAndManyShareTo(entities: string[], shareTo: string[]): Promise<SharingDto[]> {
        if (isHasEmpty(entities, shareTo))
            throwException(API_ERROR_CODES.COMMON.EMPTY_PARAM, {method: 'getByEntitiesAndManyShareTo', fields: {entities}})

        return this.mongoSharingManager.getByEntitiesAndManyShareTo(entities, shareTo);
    }

    async getByEntityAndType(entity: string, type: string): Promise<SharingDto[]> {
        if (isHasEmpty(entity, type))
            throwException(API_ERROR_CODES.COMMON.EMPTY_PARAM, {method:'getByEntityAndType', fields: {entity, type}})

        return this.mongoSharingManager.getByEntityAndType(entity, type);
    }

    async getByEntitiesAndType(entities: string[], type: string): Promise<SharingDto[]> {
        if (isHasEmpty(entities, type))
            throwException(API_ERROR_CODES.COMMON.EMPTY_PARAM, {method:'getByEntitiesAndType', fields: {entities, type}})

        return this.mongoSharingManager.getByEntitiesAndType(entities, type);
    }

    async getOrgWide(entityName: string): Promise<SharingDto> {
        if (isHasEmpty(entityName)) throwException(API_ERROR_CODES.COMMON.EMPTY_PARAM, {method: 'checkOrgWide', fields: {entityName}});

        return this.mongoSharingManager.getOrgWide(entityName);
    }

    async create(sharing: SharingDto): Promise<SharingDto> {
        if (isHasEmpty(sharing)) return null;

        return this.mongoSharingManager.create(sharing);
    }

    async createMany(sharing: SharingDto[]): Promise<SharingDto[]> {
        if (isHasEmpty(sharing)) return null;

        return this.mongoSharingManager.createMany(sharing);
    }

    async update(sharing: SharingDto): Promise<SharingDto> {
        if (isHasEmpty(sharing)) throwException(API_ERROR_CODES.COMMON.EMPTY_PARAM, {method: 'update', fields: {sharing}});

        return this.mongoSharingManager.update(sharing);
    }

    async deleteById(id: string): Promise<boolean> {
        if (isHasEmpty(id)) throwException(API_ERROR_CODES.COMMON.EMPTY_PARAM, {method: 'deleteById', fields: {id}});

        return this.mongoSharingManager.deleteById(id);
    }

    async deleteAllByEntity(entityId: string): Promise<boolean> {
        if (isHasEmpty(entityId)) throwException(API_ERROR_CODES.COMMON.EMPTY_PARAM, {method: 'deleteAllByEntity', fields: {entityId}});

        return this.mongoSharingManager.deleteAllByEntity(entityId);
    }

    async deleteAutomatedByEntity(entityId: string): Promise<void> {
        if (isHasEmpty(entityId)) throwException(API_ERROR_CODES.COMMON.EMPTY_PARAM, {method: 'deleteAutomatedByEntity', fields: {entityId}});

        return this.mongoSharingManager.deleteAutomatedByEntity(entityId);
    }

    async deleteByEntityAndType(entityId: string, type: SharingTypes): Promise<void> {
        if (isHasEmpty(entityId, type)) return;

        return this.mongoSharingManager.deleteByEntityAndType(entityId, type);
    }
}