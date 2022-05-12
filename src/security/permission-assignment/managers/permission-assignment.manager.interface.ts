import {PermissionAssignmentDto} from "../../../entities/inmost/permission-assignment/permission-assignment.dto";

export default interface IPermissionAssignmentManager {
  getAll();
  getAllByPermissionSetIds(permissionSets: string[]): Promise<PermissionAssignmentDto[]>;
  getByPermissionIdAndPermissionSetIds(permissionId: string, permissionSetIds: string[]): Promise<PermissionAssignmentDto>;
  getByPermissionIdsAndPermissionSetIds(permissionIds: string[], permissionSetIds: string[]): Promise<PermissionAssignmentDto[]>
  create(permission: PermissionAssignmentDto): Promise<PermissionAssignmentDto>;
  createMany(permissionAssignments: PermissionAssignmentDto[]): Promise<PermissionAssignmentDto[]>;
  deleteById(id: string);
}