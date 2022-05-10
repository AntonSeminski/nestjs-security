import {MongoPermissionSetManagerMixin} from "../mongo-permission-set-manager.mixin";
import {PermissionSetTypes} from "../../../../../entities";

export class MongoPermissionSetManager extends MongoPermissionSetManagerMixin(PermissionSetTypes.PERMISSION_SET) {}