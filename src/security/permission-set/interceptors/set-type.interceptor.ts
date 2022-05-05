import {CallHandler, ExecutionContext, NestInterceptor} from "@nestjs/common";
import {Observable} from "rxjs";
import {MongoPermissionSetManager} from "../managers/mongo-permission-set/mongo-permission-set.manager";
import {PermissionSetTypes} from "../../../entities/inmost/permission-set/permissions-set.types";
import {throwException} from "@asemin/nestjs-utils";
import {API_ERROR_CODES} from "@jira-killer/constants";

export class SetTypeInterceptor implements NestInterceptor{
    constructor(private readonly type: PermissionSetTypes) {
        this.type = type;
    }

    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        if (!Object.values(PermissionSetTypes).includes(this.type))
            throwException(API_ERROR_CODES.PERMISSION.WRONG_TYPE);

        MongoPermissionSetManager.type = this.type

        return next.handle().pipe()
    }

}