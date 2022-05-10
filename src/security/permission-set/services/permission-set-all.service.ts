import {PermissionSetAllManager} from "../managers";
import {PermissionSetServiceMixin} from "../permission-set.mixin";

export class PermissionSetAllService extends PermissionSetServiceMixin(PermissionSetAllManager) {}