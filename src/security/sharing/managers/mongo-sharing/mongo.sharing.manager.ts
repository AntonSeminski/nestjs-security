import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import ISharingManager from "../sharing.manager.interface";
import {EDatabaseConnectionType, isHasEmpty, MongoManager} from "@asemin/nestjs-utils";
import {SharingDto} from "../../../../entities";
import {Sharing} from "../../../../entities";
import {AUTOMATED_SHARING_TYPES} from "../../constants";
import {UpdateSharingDto} from "../../dto/update-sharing.dto";

@Injectable()
export class MongoSharingManager extends MongoManager implements ISharingManager {
    constructor(
        @InjectModel(Sharing.name) private readonly sharingModel: Model<Sharing>,
    ) {
        super(EDatabaseConnectionType.Inmost);
    }

    async getAll(): Promise<SharingDto[]> {
        const allSharing = await this.sharingModel.find({}, {}, {session: this.getSession()})

        return allSharing?.map(sharing => new SharingDto(sharing));
    }

    async getAllByType(type: string): Promise<SharingDto[]> {
        if (isHasEmpty(type)) return null;

        const allSharing = await this.sharingModel.find({type}, {}, {session: this.getSession()})

        return allSharing?.map(sharing => new SharingDto(sharing));
    }

    async getAllByEntity(entity: string): Promise<SharingDto[]> {
        if (isHasEmpty(entity)) return null;

        const allSharing = await this.sharingModel.find({entity}, {}, {session: this.getSession()})

        return allSharing?.map(sharing => new SharingDto(sharing));
    }

    async getAllByEntities(entities: string[]): Promise<SharingDto[]> {
        if (isHasEmpty(entities)) return null;

        const allSharing = await this.sharingModel.find({entity:{$in: entities}}, {}, {session: this.getSession()});

        return allSharing?.map(sharing => new SharingDto(sharing));
    }

    async getByEntitiesAndShareTo(entities: string[], shareTo: string): Promise<SharingDto[]> {
        if (isHasEmpty(entities, shareTo)) return null;

        const allSharing = await this.sharingModel.find({entity: {$in: entities}, sharedTo: shareTo}, {}, {session: this.getSession()});

        return allSharing?.map(sharing => new SharingDto(sharing));
    }

    async getByEntitiesAndManyShareTo(entities: string[], shareTo: string[]): Promise<SharingDto[]> {
        if (isHasEmpty(entities, shareTo)) return null;

        const allSharing = await this.sharingModel.find({entity: {$in: entities}, sharedTo: {$in: shareTo}}, {}, {session: this.getSession()});

        return allSharing?.map(sharing => new SharingDto(sharing));
    }
    
    async getByEntityAndType(entity: string, type: string): Promise<SharingDto[]> {
        if (isHasEmpty(entity, type)) return null;

        const allSharing = await this.sharingModel.find({entity, type}, {}, {session: this.getSession()})

        return allSharing?.map(sharing => new SharingDto(sharing));
    }

    async getByEntitiesAndType(entities: string[], type: string): Promise<SharingDto[]> {
        if (isHasEmpty(entities, type)) return null;

        const allSharing = await this.sharingModel.find({entity: {$in: entities}, type}, {}, {session: this.getSession()})

        return allSharing?.map(sharing => new SharingDto(sharing));
    }

    async getOrgWide(entityName: string): Promise<SharingDto> {
        if (isHasEmpty(entityName)) return null;

        const sharing = await this.sharingModel.findOne({entity: entityName}, {}, {session: this.getSession()})

        return sharing === null ? null : new SharingDto(sharing);
    }

    async create(sharing: SharingDto): Promise<SharingDto> {
        if (isHasEmpty(sharing)) return null;

        let newSharing = await this.sharingModel.create([sharing], {session: this.getSession()})

        return newSharing === null ? null : new SharingDto(newSharing[0]);
    }

    async createMany(sharing: SharingDto[]): Promise<SharingDto[]> {
        if (isHasEmpty(sharing)) return null;

        const newSharing = await this.sharingModel.create(sharing, {session: this.getSession()});

        return newSharing?.map(sharing => new SharingDto(sharing));
    }

    async update(sharing: UpdateSharingDto): Promise<SharingDto> {
        if (isHasEmpty(sharing)) return null;

        let updatedSharing = await this.sharingModel.findByIdAndUpdate(
            sharing._id,
            {...sharing},
            {new: true, session: this.getSession()}
        );

        return !!updatedSharing ? new SharingDto(updatedSharing) : null;
    }

    async deleteById(id: string): Promise<boolean> {
        if (isHasEmpty(id)) return null;

        const deletedAssignment = await this.sharingModel.findByIdAndDelete(id, {session: this.getSession()});

        return !!deletedAssignment;
    }

    async deleteAllByEntity(entityId: string): Promise<boolean> {
        if (isHasEmpty(entityId)) return null;

        const deletedSharing = await this.sharingModel.deleteMany({entity: entityId}, {session: this.getSession()});

        return !!deletedSharing;
    }

    async deleteAutomatedByEntity(entityId: string): Promise<void> {
        if (isHasEmpty(entityId)) return null;

        await this.sharingModel.deleteMany({entity: entityId, type: {$in: AUTOMATED_SHARING_TYPES}}, {session: this.getSession()});
    }
}