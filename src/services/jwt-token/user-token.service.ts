import { JwtTokenService } from "@asemin/nestjs-utils";
import {Injectable} from "@nestjs/common";
import {ConfigService} from "@nestjs/config";

@Injectable()
export class UserTokenService extends JwtTokenService{
    constructor(private configService: ConfigService) {
        super(
            configService.get('JWT_USER_TOKEN_SECRET'),
            configService.get('JWT_USER_TOKEN_EXPIRESIN')
        );
    }
}