import {ApiProperty} from "@nestjs/swagger";
import {IsEnum, IsOptional, IsString} from "class-validator";
import {AccessLevels, RecordDto, SharingTypes} from "../../../entities";

export class UpdateSharingDto extends RecordDto {
    @ApiProperty({type: String, example: '1390ada0czx90c123', description: 'Related Entity Id or Entity Type.'})
    @IsString()
    @IsOptional()
    entity: string;

    @ApiProperty({type: String, enum: SharingTypes, description: 'Sharing type.'})
    @IsOptional()
    @IsEnum(SharingTypes)
    type: string;

    @ApiProperty({enum: AccessLevels, description: 'Provided Access level.'})
    @IsOptional()
    @IsEnum(AccessLevels)
    accessLevel: string;

    @ApiProperty({example: "sad123adczczc132", description: 'Related user Id / Role Level etc.'})
    @IsOptional()
    @IsString()
    sharedTo?: string | number;

    @ApiProperty({type: String, example: "sad123adczczc132", description: 'Related Id, that caused sharing. Could be Role, Group etc...'})
    @IsOptional()
    @IsString()
    reason?: string;

    constructor(sharing: any) {
        super(sharing);

        this.entity = sharing?.entity?.toString();
        this.type = sharing?.type;
        this.accessLevel = sharing?.accessLevel;
        this.sharedTo = sharing?.sharedTo?.toString();
        this.reason = sharing?.reason?.toString();
    }
}