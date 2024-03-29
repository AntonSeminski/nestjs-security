import {IsEnum, IsNotEmpty, IsOptional, IsString} from "class-validator";
import {EPermissionTypes} from "@jira-killer/constants";
import {ApiProperty} from "@nestjs/swagger";
import {RecordDto} from "../../../entities";

export class PermissionDto extends RecordDto {
    @ApiProperty({example: 'Manage Field Metadata'})
    @IsString()
    @IsNotEmpty()
    label: string;

    @ApiProperty({example: 'ABSOLUTE POWER!', description: 'Permission name.' })
    @IsString()
    @IsNotEmpty()
    apiName: string;

    @ApiProperty({example: 'ABSOLUTE POWER!', description: 'Permission description. Optional.' })
    @IsString()
    @IsOptional()
    description: string;

    @ApiProperty({enum: EPermissionTypes, description: 'Permission Type. Choice is limited!'})
    @IsEnum(PermissionDto)
    @IsNotEmpty()
    type: string;

    @ApiProperty({description: 'Formula field of format: ApiName.Type.Value'})
    index?: string;

    constructor(permission: any) {
        super(permission);

        this.label = permission?.label;
        this.apiName = permission?.apiName;
        this.type = permission?.type;
        this.description = permission?.description;
        this.index = permission?.index;
    }
}