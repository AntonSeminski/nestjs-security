import {AuthGuard} from "@asemin/nestjs-utils"
import {UserTokenService} from "../../services";

export class UserAuthGuard extends AuthGuard(UserTokenService){}