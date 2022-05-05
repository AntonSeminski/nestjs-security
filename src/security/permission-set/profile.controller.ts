import {Body, Controller, Get, HttpStatus, Param, Post, UseInterceptors} from "@nestjs/common";
import {PermissionSetService} from "./permission-set.provider";
import {PermissionSetDto} from "../../entities/inmost/permission-set/pemrission-set.dto";
import {PermissionSetAssignmentDto} from "./dtos/permission-set-assignment.dto";
import {SetTypeInterceptor} from "./interceptors/set-type.interceptor";
import {PermissionSetTypes} from "../../entities/inmost/permission-set/permissions-set.types";
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";

@ApiTags('UserPermissions / Profile')
@UseInterceptors(new SetTypeInterceptor(PermissionSetTypes.PROFILE))
@Controller('userPermissions/profile')
export class ProfileController {
    constructor(private permissionSetService: PermissionSetService) {}

    @ApiOperation({summary: 'Get all Profiles.'})
    @ApiResponse({status: HttpStatus.OK, type: [PermissionSetDto], description: 'Create Profile.'})
    @Get('getAll')
    async getAll(): Promise<PermissionSetDto[]> {
        return await this.permissionSetService.getAll();
    }

    @ApiOperation({summary: 'Get Profile by Name.'})
    @ApiResponse({status: HttpStatus.OK, type: PermissionSetDto, description: 'Get Profile by Name.'})
    @Get('get/byName/:name')
    async getByName(@Param('name') name: string): Promise<PermissionSetDto> {
        return await this.permissionSetService.getByName(name);
    }

    @ApiOperation({summary: `Get User's Profiles.`})
    @ApiResponse({status: HttpStatus.OK, type: [PermissionSetDto], description: `Get User's Profiles.`})
    @Get('get/forUser/:userId')
    async getForUser(@Param('userId') userId: string): Promise<PermissionSetDto[]> {
        return await this.permissionSetService.getByUserId(userId);
    }

    @ApiOperation({summary: `Create Profile.`})
    @ApiResponse({status: HttpStatus.OK, type: PermissionSetDto, description: `Create Profile.`})
    @Post('create')
    async create(@Body() permissionSet: PermissionSetDto) {
        return await this.permissionSetService.create(permissionSet);
    }

    @ApiOperation({summary: `Assign user to Profile.`})
    @ApiResponse({status: HttpStatus.OK, type: PermissionSetDto, description: `Assign user to Profile.`})
    @Post('assignUser')
    async assignUser(@Body() assignment: PermissionSetAssignmentDto): Promise<PermissionSetDto> {
        const {permissionSetId, userId} = assignment;

        return await this.permissionSetService.assignUser(permissionSetId, userId);
    }

    @ApiOperation({summary: `Remove user from Profile.`})
    @ApiResponse({status: HttpStatus.OK, type: PermissionSetDto, description: `Remove user from Profile.`})
    @Post('removeAssignment')
    async removeAssignment(@Body() removeAssignment: PermissionSetAssignmentDto): Promise<PermissionSetDto> {
        const {permissionSetId, userId} = removeAssignment;

        return await this.permissionSetService.removeAssignment(permissionSetId, userId);
    }
}