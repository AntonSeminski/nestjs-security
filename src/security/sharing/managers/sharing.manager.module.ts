import { Module } from '@nestjs/common';
import { SharingManager } from './sharing.manager.service';
import {MongoSharingManagerModule} from "./mongo-sharing";


@Module({
  imports: [MongoSharingManagerModule],
  providers: [SharingManager],
  exports: [SharingManager],
})
export class SharingManagerModule {
}
