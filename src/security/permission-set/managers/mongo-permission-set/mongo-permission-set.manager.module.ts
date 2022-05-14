import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {PermissionSet,PermissionSetSchemaMongo} from "../../../../entities";
import {ObjectModule} from "../../../../services";
import {EDatabaseConnectionType, SessionManagerModule} from "@asemin/nestjs-utils";
import {MongoPermissionSetAllManager, MongoPermissionSetManager, MongoProfileManager} from "./services";

@Module({
    imports: [
        MongooseModule.forFeatureAsync([{
                name: PermissionSet.name,
                useFactory: () => PermissionSetSchemaMongo
            }], EDatabaseConnectionType.Inmost
        ),
        ObjectModule,
        SessionManagerModule
    ],
    providers: [MongoPermissionSetManager, MongoProfileManager, MongoPermissionSetAllManager],
    exports: [MongoPermissionSetManager, MongoProfileManager, MongoPermissionSetAllManager]
})
export class MongoPermissionSetManagerModule {
}