import {PermissionSetProvider} from "./permission-set.provider";
import {PermissionSetTypes} from "../../../entities";

export class PermissionSetService extends PermissionSetProvider(PermissionSetTypes.PERMISSION_SET) {}