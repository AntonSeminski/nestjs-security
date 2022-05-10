import {Module} from "@nestjs/common";
import {PermissionSetManagerModule} from "./managers";
import {ProfileController} from "./controllers/profile.controller";
import {PermissionSetController} from "./controllers/permission-set.controller";
import {JwtTokenModule} from "../../services";
import {SessionManagerModule} from "@asemin/nestjs-utils";
import {PermissionSetService} from "./services/permission-set.service";
import {ProfileService} from "./services/profile.service";
import {PermissionSetProvider} from "./services/permission-set.provider";
import {PermissionSetAllService} from "./services/permission-set-all.service";

@Module({
    imports: [
        PermissionSetManagerModule,
        JwtTokenModule,
        SessionManagerModule
    ],
    controllers: [ProfileController, PermissionSetController],
    providers: [PermissionSetService, ProfileService, PermissionSetAllService],
    exports: [PermissionSetService, ProfileService, PermissionSetAllService, PermissionSetProvider]
})
export class PermissionSetModule {}