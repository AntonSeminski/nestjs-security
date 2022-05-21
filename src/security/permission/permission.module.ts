import {Module} from "@nestjs/common";
import {PermissionController} from "./permission.controller";
import {PermissionProvider} from "./permission.provider";
import {PermissionManagerModule} from "./managers";
import {PermissionAssignmentModule} from "../permission-assignment";
import {JwtTokenModule} from "../../services";
import {PermissionService} from "./permission.service";

@Module({
    imports: [
        PermissionManagerModule,
        PermissionAssignmentModule,
        JwtTokenModule
    ],
    controllers: [PermissionController],
    providers: [PermissionProvider, PermissionService],
    exports: [PermissionProvider, PermissionService]
})
export class PermissionModule {}