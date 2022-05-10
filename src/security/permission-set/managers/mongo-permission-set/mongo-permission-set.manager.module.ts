import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {MongoPermissionSetManager} from './mongo-permission-set.manager';
import {PermissionSet,PermissionSetSchemaMongo} from "../../../../entities/inmost/permission-set/permissions-set.schema";
import {ObjectModule} from "../../../../common/services/object/object.module";
import {DatabaseConnectionTypeEnum, SessionManagerModule} from "@asemin/nestjs-utils";

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
    exports: [MongoPermissionSetManager]
})
export class MongoPermissionSetManagerModule {
}