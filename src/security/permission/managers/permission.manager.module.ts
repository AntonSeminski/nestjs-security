import { Module } from '@nestjs/common';
import { PermissionManager } from './permission.manager.service';
import {MongoPermissionManagerModule} from "./mongo-permission/mongo.permission.manager.module";


@Module({
  imports: [MongoPermissionManagerModule],
  providers: [PermissionManager],
  exports: [PermissionManager],
})
export class PermissionManagerModule {
}
