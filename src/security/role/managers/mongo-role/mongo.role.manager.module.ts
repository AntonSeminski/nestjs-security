import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {MongoRoleManager} from './mongo.role.manager';
import {DatabaseConnectionTypeEnum, SessionManagerModule} from "@asemin/nestjs-utils";
import {Role, RoleSchemaMongo} from "../../../../entities/inmost/role/role.schema";

@Module({
    imports: [
        MongooseModule.forFeature([{name: Role.name, schema: RoleSchemaMongo}],DatabaseConnectionTypeEnum.INMOST),
        SessionManagerModule
    ],
    providers: [MongoRoleManager],
    exports: [MongoRoleManager]
})
export class MongoRoleManagerModule {
}