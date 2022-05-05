import { Module } from '@nestjs/common';
import { RoleManager } from './role.manager.service';
import {MongoRoleManagerModule} from "./mongo-role/mongo.role.manager.module";


@Module({
  imports: [MongoRoleManagerModule],
  providers: [RoleManager],
  exports: [RoleManager],
})
export class RoleManagerModule {
}
