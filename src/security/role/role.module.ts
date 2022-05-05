import {Module} from "@nestjs/common";
import {RoleManagerModule} from "./managers/role.manager.module";
import {RoleController} from "./role.controller";
import {RoleService} from "./role.provider";

@Module({
    imports: [RoleManagerModule],
    controllers: [RoleController],
    providers: [RoleService],
    exports: [RoleService]
})
export class RoleModule {}