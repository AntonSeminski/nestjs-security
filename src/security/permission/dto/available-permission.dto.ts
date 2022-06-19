import {PermissionDto, RecordDto} from "../../../entities";
import {ApiProperty} from "@nestjs/swagger";
import {IsEnum, IsNotEmpty, IsOptional, IsString} from "class-validator";
import {EPermissionTypes} from "@jira-killer/constants";

export class AvailablePermissionDto extends RecordDto {
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

    @ApiProperty({description: 'Permission volume'})
    @IsOptional()
    value?: string;

    @ApiProperty({description: 'Formula field of format: ApiName.Type.Value'})
    index?: string;

    @ApiProperty({description: 'Boolean that states for availability of the permission for permission set.'})
    isAvailable: boolean;

    constructor(permission: any) {
        super(permission);

        this.label = permission?.label;
        this.apiName = permission?.apiName;
        this.type = permission?.type;
        this.value = permission?.value;
        this.description = permission?.description;
        this.index = permission?.index;
        this.isAvailable = permission?.isAvailable;
    }
}