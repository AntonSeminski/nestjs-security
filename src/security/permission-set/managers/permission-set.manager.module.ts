import { Module } from '@nestjs/common';
import { MongoPermissionSetManagerModule } from './mongo-permission-set';
import {PermissionSetManager} from "./permission-set.manager.service";

@Module({
  imports: [MongoPermissionSetManagerModule],
  exports: [PermissionSetManager]
})
export class PermissionSetManagerModule {
}
