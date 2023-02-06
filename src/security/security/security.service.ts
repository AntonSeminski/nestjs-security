import {Injectable} from "@nestjs/common";
import {PermissionDto, PermissionProvider} from "../permission";
import {PermissionAssignmentService} from "../permission-assignment";
import {isHasEmpty, throwException} from "@asemin/nestjs-utils";
import {API_ERROR_CODES, EPermissionTypes} from "@jira-killer/constants";
import {AccessLevels, hasAccess, isGreaterAccess} from "../../entities";
import {ObjectUtil} from "../../common/utils/object.util";
import {FieldPermissionDto} from "../permission/dto/field-permission.dto";
import {FieldsAccessDto} from "./dtos/fields-access.dto";

@Injectable()
export class SecurityService {
    constructor(
        private readonly permissionService: PermissionProvider,
        private readonly permissionAssignmentService: PermissionAssignmentService
    ) {}

    async hasObjectAccess(objectName: string, permissionSets: Array<string>): Promise<boolean> {
        if (!permissionSets) throwException(API_ERROR_CODES.PERMISSION.NONE_AVAILABLE);

        const objectPermission = await this.permissionService.getByNameAndType(objectName, EPermissionTypes.Object);
        if (!objectPermission) throwException(API_ERROR_CODES.PERMISSION.NOT_FOUND);

        const hasPermission = await this.permissionAssignmentService.getByPermissionIdAndPermissionSetIds(objectPermission._id, permissionSets);
        if (!hasPermission) throwException(API_ERROR_CODES.PERMISSION.NONE_AVAILABLE);

        return true;
    }

    async hasFieldAccess(fieldNames: Array<string>, objectName: string, permissionSets: Array<string>): Promise<Map<string, AccessLevels>> {
        if (isHasEmpty(permissionSets, fieldNames)) throwException(API_ERROR_CODES.PERMISSION.NONE_AVAILABLE);

        const fieldPermissions: Array<FieldPermissionDto> = await this.permissionService.getFieldPermissions(objectName, fieldNames);
        if (!fieldPermissions) throwException(API_ERROR_CODES.PERMISSION.NOT_FOUND);

        const fieldPermissionById = ObjectUtil.mapBy(fieldPermissions, '_id');
        const permissionIds = fieldPermissions.map(fp => fp._id,);

        const permissionAssignments = await this.permissionAssignmentService.getByPermissionIdsAndPermissionSetIds(permissionIds, permissionSets);
        if (!permissionAssignments) throwException(API_ERROR_CODES.PERMISSION.NONE_AVAILABLE);

        const accessLevelByFieldName = new Map<string, AccessLevels>();

        //init with none
        fieldNames.forEach(fieldName => {
           accessLevelByFieldName.set(fieldName, AccessLevels.NONE);
        });

        permissionAssignments.forEach(pa => {
            const fieldPermission = fieldPermissionById[pa.permission];
            const accessLevel = accessLevelByFieldName.get(fieldPermission.name);

            if (isGreaterAccess(fieldPermission.accessLevel, accessLevel)) {
                accessLevelByFieldName.set(fieldPermission.name, fieldPermission.accessLevel);
            }
        });

        return accessLevelByFieldName;
    }
}