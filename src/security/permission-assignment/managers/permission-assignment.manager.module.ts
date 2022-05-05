import { Module } from '@nestjs/common';
import { PermissionAssignmentManager } from './permission-assignment.manager.service';
import {MongoPermissionAssignmentManagerModule} from "./mongo-permission-assignment/mongo.permission-assignment.manager.module";


@Module({
  imports: [MongoPermissionAssignmentManagerModule],
  providers: [PermissionAssignmentManager],
  exports: [PermissionAssignmentManager],
})
export class PermissionAssignmentManagerModule {
}
