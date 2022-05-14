import {IsEnum, IsOptional, IsString} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";
import {RecordDto} from "../../../entities";
import {EPermissionTypes} from "@jira-killer/constants";

export class UpdatePermissionDto extends RecordDto {
    @ApiProperty({example: 'Manage Field Metadata'})
    @IsString()
    @IsOptional()
    label: string;

    @ApiProperty({example: 'ABSOLUTE POWER!', description: 'Permission name.' })
    @IsString()
    @IsOptional()
    apiName: string;

    @ApiProperty({example: 'ABSOLUTE POWER!', description: 'Permission description. Optional.' })
    @IsString()
    @IsOptional()
    description: string;

    @ApiProperty({enum: EPermissionTypes, description: 'Permission Type. Choice is limited!'})
    @IsEnum(EPermissionTypes)
    @IsOptional()
    type: string;

    @ApiProperty({description: 'Permission volume'})
    @IsOptional()
    volume?: string;

    constructor(permission: any) {
        super(permission);

        this.label = permission?.label;
        this.apiName = permission?.apiName;
        this.type = permission?.type;
        this.volume = permission?.volume;
        this.description = permission?.description;
    }
}