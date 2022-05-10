import {PermissionSetManagerMixin} from "../permission-set.manager.mixin";
import {MongoProfileManager} from "../mongo-permission-set";

export class ProfileManager extends PermissionSetManagerMixin(MongoProfileManager) {}