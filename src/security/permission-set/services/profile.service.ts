import {PermissionSetProvider} from "./permission-set.provider";
import {PermissionSetTypes} from "../../../entities";

export class ProfileService extends PermissionSetProvider(PermissionSetTypes.PERMISSION_SET) {}