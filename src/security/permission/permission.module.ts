import {Module} from "@nestjs/common";
import {PermissionController} from "./permission.controller";
import {PermissionService} from "./permission.provider";
import {PermissionManagerModule} from "./managers/permission.manager.module";
import {PermissionAssignmentModule} from "../permission-assignment/permission-assignment.module";
import {JwtTokenModule} from "../../services/jwt-token/jwt-token.module";

@Module({
    imports: [
        PermissionManagerModule,
        PermissionAssignmentModule,
        JwtTokenModule
    ],
    controllers: [PermissionController],
    providers: [PermissionService],
    exports: [PermissionService]
})
export class PermissionModule {}