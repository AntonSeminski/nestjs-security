import {Module} from "@nestjs/common";
import {PermissionSetManagerModule} from "./managers";
import {ProfileController} from "./controllers/profile.controller";
import {PermissionSetController} from "./controllers/permission-set.controller";
import {JwtTokenModule} from "../../services";
import {SessionManagerModule} from "@asemin/nestjs-utils";
import {PermissionSetService} from "./services/permission-set.service";
import {ProfileService} from "./services/profile.service";
import {PermissionSetProvider} from "./services/permission-set.provider";

@Module({
    imports: [
        PermissionSetManagerModule,
        JwtTokenModule,
        SessionManagerModule
    ],
    controllers: [ProfileController, PermissionSetController],
    providers: [PermissionSetService, ProfileService],
    exports: [PermissionSetService, ProfileService, PermissionSetProvider]
})
export class PermissionSetModule {}