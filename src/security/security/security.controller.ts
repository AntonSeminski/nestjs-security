import {Body, Controller, Get, Inject, Param, Post, Req, UseGuards} from "@nestjs/common";
import {WorkspaceAuthGuard} from "../../common";
import {AuthInfo} from "@asemin/nestjs-utils";
import {SecurityService} from "./security.service";
import {FieldsAccessDto} from "./dtos/fields-access.dto";

@UseGuards(WorkspaceAuthGuard)
@Controller('/security/check')
export class SecurityController {
    @Inject() private securityService: SecurityService;

    @Get('/object/:objectName')
    async hasObjectAccess(@Param('objectName') objectName: string, @Req() request) {
        const permissionSets = await AuthInfo.getAllPermissionSets(request);

        return this.securityService.hasObjectAccess(objectName, permissionSets);
    }

    @Post('/fields')
    async hasFieldAccess(@Body() body: FieldsAccessDto, @Req() request) {
        const permissionSets = await AuthInfo.getAllPermissionSets(request);

        return this.securityService.hasFieldAccess(body.fieldNames, body.objectName, permissionSets);
    }
}