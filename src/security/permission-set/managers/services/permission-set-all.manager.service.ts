import {PermissionSetManagerMixin} from "../permission-set.manager.mixin";
import {MongoPermissionSetAllManager} from "../mongo-permission-set";

export class PermissionSetAllManager extends PermissionSetManagerMixin(MongoPermissionSetAllManager) {}