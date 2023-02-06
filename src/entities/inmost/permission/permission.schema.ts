import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";

@Schema({
    toJSON: {
        virtuals: true,
    },
})
export class Permission {
    @Prop({required: true})
    label: string;

    @Prop({required: true})
    apiName: string;

    @Prop({required: true})
    type: string;

    @Prop({})
    description: string;
}

export type PermissionDocument = Permission & Document;
export const PermissionSchemaMongo = SchemaFactory.createForClass(Permission);
PermissionSchemaMongo.virtual('index').get(function (this: PermissionDocument) {
    return `${this.apiName}.${this.type}`;
})
PermissionSchemaMongo.index({apiName: 1, type: 1}, {unique: true});