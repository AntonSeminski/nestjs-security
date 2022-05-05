import {Injectable} from "@nestjs/common";
import {SharingService} from "./sharing.provider";

@Injectable()
export class SharingSecurityTrigger {
    constructor(
        private sharingService: SharingService
    ) {}

    async onPost(schemaType: any) {
        const schema = schemaType;

        schema.post('save', async (entity) => {
            // await this.sharingService.createAutomatedSharing(entity);
        });

        schema.post('update', async (entity) => {
            await this.sharingService.deleteAutomatedByEntity(entity._id);

            // await this.sharingService.createAutomatedSharing(entity);
        });

        schema.post('delete', async (entity) => {
            await this.sharingService.deleteAllByEntity(entity._id);
        });

        return schema;
    }
}