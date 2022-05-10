import { Module } from '@nestjs/common';
import { MongoPermissionSetManagerModule } from './mongo-permission-set';
import {PermissionSetAllManager, PermissionSetManager, ProfileManager} from "./services";

@Module({
  imports: [MongoPermissionSetManagerModule],
  providers: [PermissionSetManager, PermissionSetAllManager, ProfileManager],
  exports: [PermissionSetManager, PermissionSetAllManager, ProfileManager]
})
export class PermissionSetManagerModule {
}
