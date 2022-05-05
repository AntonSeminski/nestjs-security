import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {PermissionSetTypes} from "./permissions-set.types";
import {MongoEntity} from "../../common/database/mongo-entity.schema";

@Schema()
export class PermissionSet extends MongoEntity{
    @Prop({unique: true, required: true})
    name: string;

    @Prop({type: [{type: String, description: 'Ids of the users assigned to permission set.'}] })
    assignees: string[];

    @Prop({enum: PermissionSetTypes, required: true})
    type: string
}

export type PermissionSetDocument = PermissionSet & Document;
export const PermissionSetSchemaMongo = SchemaFactory.createForClass(PermissionSet);