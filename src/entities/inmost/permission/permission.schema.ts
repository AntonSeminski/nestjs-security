import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {PermissionTypes} from "@jira-killer/constants";

@Schema({
    toJSON: {
        virtuals: true,
    },
})
export class Permission {
    @Prop({required: false})
    label: string;

    @Prop({required: true})
    apiName: string;

    @Prop({enum: PermissionTypes, required: true})
    type: string;

    @Prop({})
    description: string;

    @Prop({})
    value?: string
}

export type PermissionDocument = Permission & Document;
export const PermissionSchemaMongo = SchemaFactory.createForClass(Permission);
PermissionSchemaMongo.virtual('index').get(function (this: PermissionDocument) {
    return `${this.apiName}.${this.type}${this.value ? '.' + this.value : ''}`;
})
PermissionSchemaMongo.index({apiName: 1, type: 1, value: 1}, {unique: true});