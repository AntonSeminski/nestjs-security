import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {EDatabaseConnectionType} from "@asemin/nestjs-utils";
import {MongoPermissionAssignmentManager} from "./mongo.permission-assignment.manager";
import {PermissionAssignment,PermissionAssignmentSchemaMongo} from "../../../../entities";

@Module({
    imports: [MongooseModule.forFeature([{name: PermissionAssignment.name, schema: PermissionAssignmentSchemaMongo}], EDatabaseConnectionType.Inmost)],
    providers: [MongoPermissionAssignmentManager],
    exports: [MongoPermissionAssignmentManager]
})
export class MongoPermissionAssignmentManagerModule {
}