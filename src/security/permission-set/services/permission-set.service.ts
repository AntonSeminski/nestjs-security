import {PermissionSetServiceMixin} from "../permission-set.mixin";
import {PermissionSetManager} from "../managers";

export class PermissionSetService extends PermissionSetServiceMixin(PermissionSetManager) {}