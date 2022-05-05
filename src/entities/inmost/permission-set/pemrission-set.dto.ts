import {IsEnum, IsMongoId, IsNotEmpty, IsOptional, IsString} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";
import {PermissionSetTypes} from "./permissions-set.types";
import {EntityDto} from "../../common/dto/entity.dto";

export class PermissionSetDto extends EntityDto {
    @ApiProperty({example: 'Gangsta Boss', description: 'Permission Set name.'})
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty({type: [String], description: 'Array of assigned users.'})
    @IsMongoId()
    @IsOptional()
    assignees?: [string];

    @ApiProperty({enum: PermissionSetTypes, description: 'Permission Set type.'})
    @IsEnum(PermissionSetTypes)
    @IsNotEmpty()
    type: string;

    constructor(permissionSet: any) {
        super(permissionSet);

        this.name = permissionSet?.name;
        this.assignees = permissionSet?.assignees?.map(ass => ass.toString());
        this.type = permissionSet?.type;
    }
}