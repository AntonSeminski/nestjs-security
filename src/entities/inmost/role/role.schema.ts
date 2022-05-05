import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import mongoose from "mongoose";

@Schema()
export class Role {
    @Prop({unique: true, required: true})
    name: string;

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: Role.name})
    parent: Role;

    @Prop({type: Number})
    level: number;
}

export type RoleDocument = Role & Document;
export const RoleSchemaMongo = SchemaFactory.createForClass(Role)