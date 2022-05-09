import {Module} from '@nestjs/common';
import {WorkspaceTokenService} from './workspace-token.service';
import {UserTokenService} from "./user-token.service";
import {JwtModule} from '@nestjs/jwt';
import {ConfigModule} from "@nestjs/config";
import {InviteTokenService} from "./invite-token.service";

@Module({
    imports: [JwtModule.register({secret: 'TEST_SECRET'}), ConfigModule],
    providers: [UserTokenService, WorkspaceTokenService, InviteTokenService],
    exports: [UserTokenService, WorkspaceTokenService, InviteTokenService]
})
export class JwtTokenModule {
}
