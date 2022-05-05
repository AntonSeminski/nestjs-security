import {PermissionAssignmentDto} from "../../../entities/inmost/permission-assignment/permission-assignment.dto";

export default interface IPermissionAssignmentManager {
  getAll();
  getByPermissionAndPermissionSets(permission: string, permissionSetIds: [string]);
  create(permissionAssignment: PermissionAssignmentDto);
  deleteById(id: string);
}