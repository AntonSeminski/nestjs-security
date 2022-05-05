import {Injectable} from "@nestjs/common";
import {isHasEmpty, throwException} from "@asemin/nestjs-utils";
import {SharingService} from "./sharing.provider";
import {AccessLevels, isGreaterAccess} from "../../entities/inmost/sharing/access-level.constants";
import {SharingDto} from "../../entities/inmost/sharing/sharing.dto";
import {API_ERROR_CODES} from '@jira-killer/constants'
import {SharingTypes} from "../../entities/inmost/sharing/sharing-type.constants";

@Injectable()
export class SharingSecurityService {
    constructor(private sharingService: SharingService) {
    }

    async getOrgWideAccess(entityName: string): Promise<AccessLevels | string> {
        if (isHasEmpty(entityName))
            throwException(API_ERROR_CODES.COMMON.EMPTY_PARAM, {method: 'getOrgWideAccess', fields: {entityName}});

        const orgWideSharing = await this.sharingService.getOrgWide(entityName);

        return orgWideSharing?.accessLevel;
    }

    async getBestAccess(entity: string, shareTo: string): Promise<string> {
        if (isHasEmpty(entity))
            throwException(API_ERROR_CODES.COMMON.EMPTY_PARAM, {method: 'getBestAccess', fields: {entity}});

        const allSharing = await this.sharingService.getAllByEntity(entity);

        let bestAccess: string = AccessLevels.NONE;

        allSharing?.forEach(sharing => {
            isGreaterAccess(sharing.accessLevel, bestAccess) && sharing.sharedTo === shareTo
                ? bestAccess = sharing.accessLevel
                : null;
        });

        return bestAccess;
    }

    async getRoleBestAccess(entity: string, roleLevel: string): Promise<string> {
        if (isHasEmpty(entity, roleLevel)) return null;

        const allSharing = await this.sharingService.getByEntityAndType(entity, SharingTypes.ROLE);

        let bestAccess: string = AccessLevels.NONE;

        allSharing?.forEach(sharing => {
            isGreaterAccess(sharing.accessLevel, bestAccess) && roleLevel < sharing.sharedTo
                ? bestAccess = sharing.accessLevel
                : null;
        });

        return bestAccess;
    }

    async getByEntitiesAndManyShareTo(entities: string[], shareTo: string[]): Promise<SharingDto[]> {
        if (isHasEmpty(entities, shareTo))
            throwException(API_ERROR_CODES.COMMON.EMPTY_PARAM, {
                method: 'getByEntitiesAndManyShareTo',
                fields: {entities}
            })

        return this.sharingService.getByEntitiesAndManyShareTo(entities, shareTo);
    }

    async getAllBestAccesses(entities: string[], shareTo: string[]): Promise<Map<string, string>> {
        if (isHasEmpty(entities, shareTo))
            throwException(API_ERROR_CODES.COMMON.EMPTY_PARAM, {method: 'getAllBestAccesses', fields: {entities}})

        const allSharing = await this.sharingService.getByEntitiesAndManyShareTo(entities, shareTo);

        const accessesByEntity = this.getAccessesByEntity(allSharing);

        return this.getBestAccessByEntity(accessesByEntity);
    }

    async getAllRoleBestAccesses(entities: string[], shareTo: string): Promise<Map<string, string>> {
        if (isHasEmpty(entities, shareTo))
            throwException(API_ERROR_CODES.COMMON.EMPTY_PARAM, {method: 'getAllRoleAccesses', fields: {entities, shareTo}})

        let allSharing = await this.sharingService.getByEntitiesAndType(entities, SharingTypes.ROLE);
        allSharing = allSharing.filter(sharing => shareTo < sharing.sharedTo);

        const accessesByEntity = this.getAccessesByEntity(allSharing);

        return this.getBestAccessByEntity(accessesByEntity);
    }

    async getBestAccesses(entities: string[], shareTo: string): Promise<Map<string, string>> {
        if (isHasEmpty(entities)) return new Map<string, string>();

        const allSharing = await this.sharingService.getByEntitiesAndShareTo(entities, shareTo);

        const accessesByEntity = this.getAccessesByEntity(allSharing);

        return this.getBestAccessByEntity(accessesByEntity);
    }

    private getAccessesByEntity = (sharing: SharingDto[]) => {
        if (isHasEmpty(sharing)) return new Map<string, string[]>();

        const accessesByEntity = new Map<string, string[]>();

        sharing.forEach(sharing => {
            const accesses = accessesByEntity.get(sharing.entity);

            accesses
                ? accesses.push(sharing.accessLevel)
                : accessesByEntity.set(sharing.entity, [sharing.accessLevel])
        });

        return accessesByEntity;
    }

    private getBestAccessByEntity = (accessesByEntity: Map<string, string[]>) => {
        if (isHasEmpty(accessesByEntity) || accessesByEntity.size === 0)
            return new Map<string, string>();

        const bestAccessByEntity = new Map<string, string>();

        accessesByEntity.forEach((accesses, entity) => {
            let bestAccess: string = AccessLevels.NONE;

            accesses.forEach(access => bestAccess = isGreaterAccess(access, bestAccess)
                ? access
                : bestAccess
            );

            if (isGreaterAccess(bestAccess, AccessLevels.NONE)) {
                bestAccessByEntity.set(entity, bestAccess);
            }
        });

        return bestAccessByEntity;
    }
}