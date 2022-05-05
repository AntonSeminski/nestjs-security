import {IsMongoId, IsNotEmpty, IsNumber, IsOptional, IsString} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";
import {RecordDto} from "../../common";

export class RoleDto extends RecordDto {
    @ApiProperty({example: 'Bouncer', description: 'Role name. Must be unique.'})
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty({example: '62260b3fd88aa9a853dae596', description: 'Use to tie parent role. Returns parent name.'})
    @IsMongoId()
    @IsOptional()
    parent?;

    @ApiProperty({example: 0, description: 'Defines level in hierarchy.'})
    @IsNumber()
    @IsOptional()
    level: number;

    @ApiProperty({example: '62260b3fd88aa9a853dae596', description: `Used to return parentId. Do not use to tie parent - won't work.`})
    @IsMongoId()
    @IsOptional()
    parentId?;

    constructor(role: any) {
        super(role);

        this.name = role?.name;
        this.parentId = role?.parent?._id ? role?.parent?._id?.toString() : role?.parent?.toString();
        this.parent = role?.parent?.name?.toString();
        this.level = role?.level;
    }
}