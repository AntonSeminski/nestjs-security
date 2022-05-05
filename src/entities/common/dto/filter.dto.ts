import {ApiProperty} from "@nestjs/swagger";
import {IsNotEmpty, IsString} from "class-validator";

export class FilterDto {
    @ApiProperty({example: 'name', type: String, description: 'Field name to filter on.'})
    @IsNotEmpty()
    @IsString()
    field: string;

    @ApiProperty({example: 'value', description: 'Field name to filter on.'})
    value: any;

    to() {
        return {$regex: {[this.field]: this.value}};
    }
}