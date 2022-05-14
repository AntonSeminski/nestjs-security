import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {EDatabaseConnectionType} from "@asemin/nestjs-utils";
import {Permission, PermissionSchemaMongo} from "../../../../entities";
import {MongoPermissionManager} from "./mongo.permission.manager";

@Module({
    imports: [MongooseModule.forFeature([
            {name: Permission.name, schema: PermissionSchemaMongo}],
        EDatabaseConnectionType.Inmost)
    ],
    providers: [MongoPermissionManager],
    exports: [MongoPermissionManager]
})

export class MongoPermissionManagerModule {
}