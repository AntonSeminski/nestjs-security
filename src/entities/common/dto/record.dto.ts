import {IsNotEmpty, IsString} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class RecordDto {
    @ApiProperty({example: "6244886b674e976cd7c09542", description: 'Id of the record. Use only when needed!'})
    @IsNotEmpty()
    @IsString()
    _id?: string;

    constructor(entity: any) {
        this._id = entity?._id?.toString();
    }
}