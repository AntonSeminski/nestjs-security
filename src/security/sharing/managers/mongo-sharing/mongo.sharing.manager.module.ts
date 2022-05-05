import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {DatabaseConnectionTypeEnum} from "@asemin/nestjs-utils";
import {MongoSharingManager} from "./mongo.sharing.manager";
import {Sharing, SharingSchemaMongo} from "../../../../entities";

@Module({
    imports: [MongooseModule.forFeature([{name: Sharing.name, schema: SharingSchemaMongo}], DatabaseConnectionTypeEnum.INMOST)],
    providers: [MongoSharingManager],
    exports: [MongoSharingManager]
})
export class MongoSharingManagerModule {
}