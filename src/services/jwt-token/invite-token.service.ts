import {Injectable} from '@nestjs/common';
import {ConfigService} from "@nestjs/config";
import {JwtTokenService} from "@asemin/nestjs-utils";

@Injectable()
export class InviteTokenService extends JwtTokenService {
    constructor(private configService: ConfigService) {
        super(
            configService ? configService.get('JWT_INVITE_TOKEN_SECRET') : process.env.JWT_WORKSPACE_TOKEN_SECRET,
            configService ? configService.get('JWT_INVITE_TOKEN_EXPIRESIN') : process.env.JWT_WORKSPACE_TOKEN_EXPIRESIN
        );
    }
}
