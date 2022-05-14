import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {MongoRoleManager} from './mongo.role.manager';
import {EDatabaseConnectionType, SessionManagerModule} from "@asemin/nestjs-utils";
import {Role, RoleSchemaMongo} from "../../../../entities";

@Module({
    imports: [
        MongooseModule.forFeature([{name: Role.name, schema: RoleSchemaMongo}],EDatabaseConnectionType.Inmost),
        SessionManagerModule
    ],
    providers: [MongoRoleManager],
    exports: [MongoRoleManager]
})
export class MongoRoleManagerModule {
}