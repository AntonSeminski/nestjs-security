import {PermissionDto} from "../dto/permission.dto";

export default interface IPermissionManager {
  getAll();
  create(permission: PermissionDto);
  update(permission: PermissionDto);
  deleteById(licenseAssignmentId: string);
}