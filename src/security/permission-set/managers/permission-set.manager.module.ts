import { Module } from '@nestjs/common';
import { MongoPermissionSetManagerModule } from './mongo-permission-set';

@Module({
  imports: [MongoPermissionSetManagerModule],
})
export class PermissionSetManagerModule {
}
