import {Module} from '@nestjs/common';
import {WorkspaceTokenService} from './workspace-token.service';
import {UserTokenService} from "./user-token.service";
import {JwtModule} from '@nestjs/jwt';
import {ConfigModule} from "@nestjs/config";

@Module({
    imports: [JwtModule.register({secret: 'TEST_SECRET'}), ConfigModule],
    providers: [UserTokenService, WorkspaceTokenService],
    exports: [UserTokenService, WorkspaceTokenService]
})
export class JwtTokenModule {
}
