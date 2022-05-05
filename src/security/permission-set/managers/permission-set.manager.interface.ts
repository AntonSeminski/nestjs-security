import {PermissionSetDto} from "../../../entities/inmost/permission-set/pemrission-set.dto";

export default interface IPermissionSetManager {
  getAll();
  getByName(name: string);
  getByUserId(userId: string);

  create(permissionSet: PermissionSetDto);

  assignUser(permissionSetId, userId);
  removeAssignment(permissionSetId, userId);
}