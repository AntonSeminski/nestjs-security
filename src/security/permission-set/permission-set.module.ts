import {Module} from "@nestjs/common";
import {PermissionSetManagerModule} from "./managers/permission-set.manager.module";
import {PermissionSetService} from "./permission-set.provider";
import {ProfileController} from "./profile.controller";
import {PermissionSetController} from "./permission-set.controller";
import {JwtTokenModule} from "../../services/jwt-token/jwt-token.module";
import {SessionManagerModule} from "@asemin/nestjs-utils";

@Module({
    imports: [
        PermissionSetManagerModule,
        JwtTokenModule,
        SessionManagerModule
    ],
    controllers: [ProfileController, PermissionSetController],
    providers: [PermissionSetService],
    exports: [PermissionSetService]
})
export class PermissionSetModule {}