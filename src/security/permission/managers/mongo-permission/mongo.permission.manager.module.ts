import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {DatabaseConnectionTypeEnum} from "@asemin/nestjs-utils";
import {Permission, PermissionSchemaMongo} from "../../../../entities/inmost/permission/permission.schema";
import {MongoPermissionManager} from "./mongo.permission.manager";

@Module({
    imports: [MongooseModule.forFeature([
            {name: Permission.name, schema: PermissionSchemaMongo}],
        DatabaseConnectionTypeEnum.INMOST)
    ],
    providers: [MongoPermissionManager],
    exports: [MongoPermissionManager]
})

export class MongoPermissionManagerModule {
}