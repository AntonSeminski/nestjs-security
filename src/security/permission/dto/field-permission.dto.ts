import {IsEnum, IsNotEmpty, IsOptional, IsString} from "class-validator";
import {EPermissionTypes} from "@jira-killer/constants";
import {ApiProperty} from "@nestjs/swagger";
import {AccessLevels, RecordDto} from "../../../entities";

export class FieldPermissionDto extends RecordDto {
    @ApiProperty({example: 'Task'})
    @IsString()
    @IsNotEmpty()
    object: string;

    @ApiProperty({example: 'Manage Field Metadata'})
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({enum: EPermissionTypes, description: 'Permission Type. Choice is limited!'})
    @IsEnum(AccessLevels)
    @IsNotEmpty()
    accessLevel: AccessLevels;

    constructor(permission: any) {
        super(permission);

        const [object, name, accessLevel] = permission?.apiName.split('.');

        this.object = object;
        this.name = name;
        this.accessLevel = accessLevel;
    }
}