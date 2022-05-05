import {Body, Controller, Get, HttpStatus, Param, Post, UseInterceptors} from "@nestjs/common";
import {PermissionSetService} from "./permission-set.provider";
import {PermissionSetDto} from "../../entities/inmost/permission-set/pemrission-set.dto";
import {PermissionSetAssignmentDto} from "./dtos/permission-set-assignment.dto";
import {SetTypeInterceptor} from "./interceptors/set-type.interceptor";
import {PermissionSetTypes} from "../../entities/inmost/permission-set/permissions-set.types";
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {EntityOwnerPipe} from "../../common/pipes/entity-owner.pipe";
import {InmostTransactionManager} from "@asemin/nestjs-utils";

@ApiTags('UserPermissions / PermissionSet')
@UseInterceptors(new SetTypeInterceptor(PermissionSetTypes.PERMISSION_SET))
@UseInterceptors(InmostTransactionManager)
@Controller('userPermissions/permissionSet')
export class PermissionSetController {
    constructor(private permissionSetService: PermissionSetService) {
    }

    @ApiOperation({summary: 'Get all Permission Sets.'})
    @ApiResponse({status: HttpStatus.OK, type: [PermissionSetDto], description: 'Create Permission Set.'})
    @Get('get/all')
    async getAll(): Promise<PermissionSetDto[]> {
        return await this.permissionSetService.getAll();
    }

    @ApiOperation({summary: 'Get Permission Set by Name.'})
    @ApiResponse({status: HttpStatus.OK, type: PermissionSetDto, description: 'Get Permission Set by Name.'})
    @Get('get/byName/:name')
    async getByName(@Param('name') name: string): Promise<PermissionSetDto> {
        return await this.permissionSetService.getByName(name);
    }

    @ApiOperation({summary: `Get User's Permission Sets.`})
    @ApiResponse({status: HttpStatus.OK, type: [PermissionSetDto], description: `Get User's Permission Sets.`})
    @Get('get/forUser/:userId')
    async getForUser(@Param('userId') userId: string): Promise<PermissionSetDto[]> {
        return await this.permissionSetService.getByUserId(userId);
    }

    @ApiOperation({summary: `Create Permission Set.`})
    @ApiResponse({status: HttpStatus.OK, type: PermissionSetDto, description: `Create Permission Set.`})
    @Post('create')
    async create(@Body(EntityOwnerPipe) permissionSet: PermissionSetDto) {
        return await this.permissionSetService.create(permissionSet);
    }

    @ApiOperation({summary: `Assign user to Permission Set.`})
    @ApiResponse({status: HttpStatus.OK, type: PermissionSetDto, description: `Assign user to Permission Set.`})
    @Post('assignUser')
    async assignUser(@Body() assignment: PermissionSetAssignmentDto): Promise<PermissionSetDto> {
        const {permissionSetId, userId} = assignment;

        return await this.permissionSetService.assignUser(permissionSetId, userId);
    }

    @ApiOperation({summary: `Remove user from Permission Set.`})
    @ApiResponse({status: HttpStatus.OK, type: PermissionSetDto, description: `Remove user from Permission Set.`})
    @Post('removeAssignment')
    async removeAssignment(@Body() removeAssignment: PermissionSetAssignmentDto): Promise<PermissionSetDto> {
        const {permissionSetId, userId} = removeAssignment;

        return await this.permissionSetService.removeAssignment(permissionSetId, userId);
    }
}