import {ApiProperty} from "@nestjs/swagger";
import {IsArray, IsMongoId, IsNotEmpty, IsString} from "class-validator";


export class FieldsAccessDto {
    @ApiProperty({description: 'Array of field names.', example: `['api_name', 'owner']`})
    @IsNotEmpty()
    @IsArray({each: true})
    fieldNames: Array<string>;

    @ApiProperty({description: 'Object Name', example: 'Task'})
    @IsNotEmpty()
    @IsString()
    objectName: string;

    constructor(body: any) {
        this.fieldNames = body?.fieldNames;
        this.objectName = body?.objectName;
    }
}