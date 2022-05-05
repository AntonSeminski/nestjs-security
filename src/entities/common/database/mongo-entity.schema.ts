import {Prop, Schema} from "@nestjs/mongoose";
import {ApiProperty} from "@nestjs/swagger";
import mongoose from "mongoose";

@Schema()
export class MongoEntity {
    @ApiProperty({example: '6230bb6547cc68cdb0707e30', type: mongoose.Schema.Types.ObjectId, description: 'Record Owner (Id).'})
    @Prop({type: String, description: 'Owner Id (User / Group / any)'})
    owner: string;
}