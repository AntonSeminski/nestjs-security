import {Injectable} from "@nestjs/common";
import {WorkspaceTokenService} from "../../services";
import {AuthGuard} from "@asemin/nestjs-utils";

@Injectable()
export class WorkspaceAuthGuard extends AuthGuard(WorkspaceTokenService){}