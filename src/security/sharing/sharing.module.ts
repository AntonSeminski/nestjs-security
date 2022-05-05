import {Module} from "@nestjs/common";
import {SharingController} from "./sharing.controller";
import {SharingService} from "./sharing.provider";
import {SharingManagerModule} from "./managers";
import {SharingSecurityService} from "./sharing-security.provider";
import {SharingSecurityTrigger} from "./sharing-security.trigger";

@Module({
    imports: [
        SharingManagerModule,
    ],
    controllers: [SharingController],
    providers: [SharingService, SharingSecurityService, SharingSecurityTrigger],
    exports: [SharingService, SharingSecurityService, SharingSecurityTrigger]
})
export class SharingModule {}