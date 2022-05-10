import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {MongoPermissionSetManagerMixin} from './mongo-permission-set-manager.mixin';
import {PermissionSet,PermissionSetSchemaMongo} from "../../../../entities/inmost/permission-set/permissions-set.schema";
import {ObjectModule} from "../../../../services/object/object.module";
import {DatabaseConnectionTypeEnum, SessionManagerModule} from "@asemin/nestjs-utils";
import {MongoPermissionSetAllManager, MongoPermissionSetManager, MongoProfileManager} from "./services";

@Module({
    imports: [
        MongooseModule.forFeatureAsync([{
                name: PermissionSet.name,
                useFactory: () => PermissionSetSchemaMongo
            }], DatabaseConnectionTypeEnum.INMOST
        ),
        ObjectModule,
        SessionManagerModule
    ],
    providers: [MongoPermissionSetManager, MongoProfileManager, MongoPermissionSetAllManager],
    exports: [MongoPermissionSetManager, MongoProfileManager, MongoPermissionSetAllManager]
})
export class MongoPermissionSetManagerModule {
}