import {PermissionSetDto} from "../../../entities";

export default interface IPermissionSetManager {
    getAll();

    getByName(name: string);

    getByUserId(userId: string);

    getIdsByUserId(userId: string);

    create(permissionSet: PermissionSetDto);

    assignUser(permissionSetId: string, userId: string);

    removeAssignment(permissionSetId: string, userId: string);

    removeAssignments(permissionSetIds: string[], userId: string)
}