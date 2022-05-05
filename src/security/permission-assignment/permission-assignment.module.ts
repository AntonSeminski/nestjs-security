import {Module} from "@nestjs/common";
import {PermissionAssignmentController} from "./permission-assignment.controller";
import {PermissionAssignmentService} from "./permission-assignment.provider";
import {PermissionAssignmentManagerModule} from "./managers/permission-assignment.manager.module";
import {PermissionModule} from "../permission/permission.module";
import {JwtTokenModule} from "../../services/jwt-token/jwt-token.module";

@Module({
    imports: [PermissionAssignmentManagerModule, JwtTokenModule],
    controllers: [PermissionAssignmentController],
    providers: [PermissionAssignmentService],
    exports: [PermissionAssignmentService]
})
export class PermissionAssignmentModule {}