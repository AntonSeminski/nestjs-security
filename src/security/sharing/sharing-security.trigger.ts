import {Injectable} from "@nestjs/common";
import {SharingService} from "./sharing.provider";

@Injectable()
export class SharingSecurityTrigger {
    constructor(
        private sharingService: SharingService
    ) {}

    async onPost(schemaType: any) {
        const schema = schemaType;

        schema.post('delete', async (entity) => {
            await this.sharingService.deleteAllByEntity(entity._id);
        });

        return schema;
    }
}