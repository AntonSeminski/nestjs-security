import {RoleDto} from "../../../entities/inmost/role/role.dto";

export default interface IRoleManager {
  getHierarchy();
  getAll();
  getParentRoles(role: RoleDto): Promise<RoleDto[]>
  getById(id: string): Promise<RoleDto>
  getByName(name: string): Promise<RoleDto>
  create(workspace: RoleDto): Promise<RoleDto>;
  update(workspace: RoleDto): Promise<RoleDto>;
}