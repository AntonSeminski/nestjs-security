import {ArgumentMetadata,Inject,Injectable,PipeTransform} from "@nestjs/common";
import {REQUEST} from "@nestjs/core";
import {AuthInfo} from "@asemin/nestjs-utils";

@Injectable()
export class EntityOwnerPipe implements PipeTransform {
    constructor(@Inject(REQUEST) private request) {}

    async transform(value: any, metadata: ArgumentMetadata): Promise<any> {
        if (value.owner) return value;

        value.owner = await this.getUserIdFromRequest();

        return value;
    }

    private async getUserIdFromRequest(): Promise<string> {
        const idFromBody = this.request.body?.owner;
        if (idFromBody) return idFromBody;

        const idFromUser = this.request.user?._id;
        if (idFromUser) return idFromUser;

        const authHeader = this.request.headers.authorization;
        if (!authHeader) return null;

        const accessTokenInfo = await AuthInfo.getAll(this.request);

        return accessTokenInfo?._id;
    }
}