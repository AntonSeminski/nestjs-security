import {Module} from "@nestjs/common";
import {PermissionSetManagerModule} from "./managers";
import {ProfileController} from "./controllers";
import {PermissionSetController} from "./controllers";
import {JwtTokenModule} from "../../services";
import {SessionManagerModule} from "@asemin/nestjs-utils";
import {PermissionSetService} from "./services";
import {ProfileService} from "./services";
import {PermissionSetAllService} from "./services";

@Module({
    imports: [
        PermissionSetManagerModule,
        JwtTokenModule,
        SessionManagerModule
    ],
    controllers: [ProfileController, PermissionSetController],
    providers: [PermissionSetService, ProfileService, PermissionSetAllService],
    exports: [PermissionSetService, ProfileService, PermissionSetAllService]
})
export class PermissionSetModule {}