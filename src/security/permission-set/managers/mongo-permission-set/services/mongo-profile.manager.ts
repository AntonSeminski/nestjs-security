import {MongoPermissionSetManagerMixin} from "../mongo-permission-set-manager.mixin";
import {PermissionSetTypes} from "../../../../../entities";

export class MongoProfileManager extends MongoPermissionSetManagerMixin(PermissionSetTypes.PROFILE) {}