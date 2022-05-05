import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import mongoose from "mongoose";
import {Permission} from "../permission/permission.schema";
import {PermissionSet} from "../permission-set/permissions-set.schema";

@Schema()
export class PermissionAssignment {
    @Prop({type: mongoose.Schema.Types.ObjectId, ref: Permission.name, required: true})
    permission: Permission;

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: PermissionSet.name, required: true})
    permissionSet: PermissionSet;
}

export type PermissionAssignmentDocument = PermissionAssignment & Document;
export const PermissionAssignmentSchemaMongo = SchemaFactory.createForClass(PermissionAssignment);