import {PermissionSetServiceMixin} from "../permission-set.mixin";
import {ProfileManager} from "../managers";

export class ProfileService extends PermissionSetServiceMixin(ProfileManager) {}