import {ApiProperty} from "@nestjs/swagger";
import {IsMongoId, IsNotEmpty} from "class-validator";
import {EntityDto} from "../../common/dto/entity.dto";


export class PermissionAssignmentDto extends EntityDto{
    @ApiProperty({description: 'Related permission Id'})
    @IsMongoId()
    @IsNotEmpty()
    permission: any;

    @ApiProperty({description: 'Related permission set Id'})
    @IsMongoId()
    @IsNotEmpty()
    permissionSet: any;

    constructor(permissionAssignment: any) {
        super(permissionAssignment);

        this.permission = permissionAssignment?.permission?.toString();
        this.permissionSet = permissionAssignment?.permissionSet?.toString();
    }
}