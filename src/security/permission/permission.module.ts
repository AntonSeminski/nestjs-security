import {Module} from "@nestjs/common";
import {PermissionController} from "./permission.controller";
import {PermissionProvider} from "./permission.provider";
import {PermissionManagerModule} from "./managers";
import {PermissionAssignmentModule} from "../permission-assignment";
import {JwtTokenModule} from "../../services";

@Module({
    imports: [
        PermissionManagerModule,
        PermissionAssignmentModule,
        JwtTokenModule
    ],
    controllers: [PermissionController],
    providers: [PermissionProvider],
    exports: [PermissionProvider]
})
export class PermissionModule {}