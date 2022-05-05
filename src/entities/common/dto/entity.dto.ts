import {IsOptional} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";
import {RecordDto} from "./record.dto";

export class EntityDto extends RecordDto {
    @ApiProperty({example: '', description: 'Owner of the record.'})
    @IsOptional()
    owner?;

    constructor(entity: any) {
        super(entity);

        this.owner = entity?.owner?.toString();
    }
}