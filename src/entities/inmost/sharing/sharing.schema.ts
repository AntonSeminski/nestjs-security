import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import * as mongoose from "mongoose";
import {SharingTypes} from "./sharing-type.constants";
import {AccessLevels} from "./access-level.constants";

@Schema()
export class Sharing {
    @Prop({type: String, required: true})
    entity: string;

    @Prop({type: String, enum: SharingTypes, required: true})
    type: string;

    @Prop({type: String, enum: AccessLevels, required: true})
    accessLevel: string;

    @Prop({type: String})
    sharedTo: string;

    @Prop({type: String})
    reason: string;
}


export type SharingDocument = Sharing & Document;
export const SharingSchemaMongo = SchemaFactory.createForClass(Sharing)