import { Module } from '@nestjs/common';
import { MongoPermissionSetManagerModule } from './mongo-permission-set/mongo-permission-set.manager.module';
import {PermissionSetManager} from "./permission-set.manager.service";


@Module({
  imports: [MongoPermissionSetManagerModule],
  providers: [PermissionSetManager],
  exports: [PermissionSetManager],
})
export class PermissionSetManagerModule {
}
