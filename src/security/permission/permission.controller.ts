import {Body, Controller, Delete, Get, HttpStatus, Param, Post, Req, UseGuards, UseInterceptors} from "@nestjs/common";
import {PermissionProvider} from "./permission.provider";
import {PermissionDto} from "./dto";
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {AuthInfo, InmostTransactionManager, throwException} from "@asemin/nestjs-utils";
import {WorkspaceAuthGuard} from "../../common";
import {UpdatePermissionDto} from "./dto";
import {API_ERROR_CODES, EObjectPermissionTypes} from "@jira-killer/constants";
import {PermissionService} from "./permission.service";
import {FastifyRequest} from "fastify";

@ApiTags('Permission')
@UseInterceptors(InmostTransactionManager)
@UseGuards(WorkspaceAuthGuard)
@Controller('permission')
export class PermissionController {
    constructor(private permissionProvider: PermissionProvider, private permissionService: PermissionService) {}

    @ApiOperation({summary: 'Get all permissions.'})
    @ApiResponse({status: HttpStatus.OK, type: [PermissionDto], description: 'Retrieve all permissions available.'})
    @Get('get/all')
    async getAll(): Promise<PermissionDto[]> {
        return await this.permissionProvider.getAll();
    }

    @ApiOperation({summary: 'Get all permission assignments for user.'})
    @ApiResponse({})
    @Get('get/all/user')
    async getAllByPermissionSets(@Req() request): Promise<PermissionDto[]> {
        return await this.permissionService.getAllForUser(request.user)
    }

    @ApiOperation({summary: 'Get all permission assignments for user.'})
    @ApiResponse({description: 'Returns an object where keys are indexes and values are permissions.'})
    @Post('get/indexes')
    async getByNames(@Req() request, @Body() indexes: string[]): Promise<any> {
        if (!indexes) throwException(API_ERROR_CODES.COMMON.EMPTY_PARAM, {message: 'Include array of indexes in Request body.'});

        return await this.permissionService.getByIndexesAndUser(indexes, request.user);
    }

    @ApiOperation({summary: 'Get all permission assignments for user to object.'})
    @ApiResponse({description: 'Returns an array of permissions where keys are indexes and values are permissions.'})
    @Post('get/object/:objectName')
    async getObjectPermissions(
        @Param('objectName') objectName: string,
        @Req() request: FastifyRequest
    ): Promise<PermissionDto[]> {
        const permissionSets = await AuthInfo.getAllPermissionSets(request);

        return await this.permissionService.getObjectPermissionsForUser(objectName, permissionSets);
    }

    @ApiOperation({summary: 'Get all permission assignments for user to object and value (read/edit/create/delete).'})
    @ApiResponse({description: 'Returns permission.'})
    @Post('get/object/:objectName/:value')
    async getObjectPermissionByValue(
        @Param('objectName') objectName: string,
        @Param('value') value: EObjectPermissionTypes,
        @Req() request: FastifyRequest
    ): Promise<PermissionDto> {
        const permissionSets = await AuthInfo.getAllPermissionSets(request);

        return await this.permissionService.getObjectPermissionByValueForUser(objectName, value, permissionSets);
    }

    @ApiOperation({summary: 'Create Permission.'})
    @ApiResponse({status: HttpStatus.OK, type: PermissionDto, description: 'Create permission.'})
    @Post('/create')
    async create(@Body() permission: PermissionDto): Promise<PermissionDto> {
        return await this.permissionProvider.create(permission);
    }

    @ApiOperation({summary: 'Create Permission.'})
    @ApiResponse({status: HttpStatus.OK, type: PermissionDto, description: 'Create permission.'})
    @Post('/createMany')
    async createMany(@Body() permissions: PermissionDto[]): Promise<PermissionDto[]> {
        return await this.permissionProvider.createMany(permissions);
    }

    @ApiOperation({summary: 'Update Permission.'})
    @ApiResponse({status: HttpStatus.OK, type: PermissionDto, description: 'Update permission.'})
    @Post('/update')
    async update(@Body() permission: UpdatePermissionDto): Promise<PermissionDto> {
        return await this.permissionProvider.update(permission);
    }

    @ApiOperation({summary: 'Delete Permission.'})
    @ApiResponse({status: HttpStatus.OK, type: PermissionDto, description: 'Delete permission.'})
    @Delete('/delete/:id')
    async delete(@Param('id') id: string): Promise<boolean> {
        return await this.permissionProvider.deleteById(id);
    }

}