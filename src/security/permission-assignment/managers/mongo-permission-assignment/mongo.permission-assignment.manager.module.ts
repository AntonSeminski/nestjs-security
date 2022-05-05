import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {DatabaseConnectionTypeEnum} from "@asemin/nestjs-utils";
import {MongoPermissionAssignmentManager} from "./mongo.permission-assignment.manager";
import {PermissionAssignment,PermissionAssignmentSchemaMongo} from "../../../../entities/inmost/permission-assignment/permission-assignment.schema";

@Module({
    imports: [MongooseModule.forFeature([{name: PermissionAssignment.name, schema: PermissionAssignmentSchemaMongo}], DatabaseConnectionTypeEnum.INMOST)],
    providers: [MongoPermissionAssignmentManager],
    exports: [MongoPermissionAssignmentManager]
})
export class MongoPermissionAssignmentManagerModule {
}