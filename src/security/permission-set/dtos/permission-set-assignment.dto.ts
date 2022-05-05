import {IsNotEmpty, IsString} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class PermissionSetAssignmentDto {
    @ApiProperty({description: 'Id of the permission set to assign user to.'})
    @IsNotEmpty()
    @IsString()
    permissionSetId: string;

    @ApiProperty({description: 'Id of the user to assign permission set to.'})
    @IsNotEmpty()
    @IsString()
    userId: string;
}