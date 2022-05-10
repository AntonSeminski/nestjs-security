import {PermissionSetManagerMixin} from "../permission-set.manager.mixin";
import {MongoPermissionSetManager} from "../mongo-permission-set";

export class PermissionSetManager extends PermissionSetManagerMixin(MongoPermissionSetManager) {}

