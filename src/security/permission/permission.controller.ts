import {Body, Controller, Delete, Get, HttpStatus, Param, Post, Req, UseGuards, UseInterceptors} from "@nestjs/common";
import {PermissionService} from "./permission.provider";
import {PermissionDto} from "./dto";
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {InmostTransactionManager, throwException} from "@asemin/nestjs-utils";
import {WorkspaceAuthGuard} from "../../common";
import {UpdatePermissionDto} from "./dto";
import {API_ERROR_CODES} from "@jira-killer/constants";

@ApiTags('Permission')
@UseInterceptors(InmostTransactionManager)
@UseGuards(WorkspaceAuthGuard)
@Controller('permission')
export class PermissionController {
    constructor(private permissionService: PermissionService) {}

    @ApiOperation({summary: 'Get all permissions.'})
    @ApiResponse({status: HttpStatus.OK, type: [PermissionDto], description: 'Retrieve all permissions available.'})
    @Get('get/all')
    async getAll(): Promise<PermissionDto[]> {
        return await this.permissionService.getAll();
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

    @ApiOperation({summary: 'Create Permission.'})
    @ApiResponse({status: HttpStatus.OK, type: PermissionDto, description: 'Create permission.'})
    @Post('/create')
    async create(@Body() permission: PermissionDto): Promise<PermissionDto> {
        return await this.permissionService.create(permission);
    }

    @ApiOperation({summary: 'Create Permission.'})
    @ApiResponse({status: HttpStatus.OK, type: PermissionDto, description: 'Create permission.'})
    @Post('/createMany')
    async createMany(@Body() permissions: PermissionDto[]): Promise<PermissionDto[]> {
        return await this.permissionService.createMany(permissions);
    }

    @ApiOperation({summary: 'Update Permission.'})
    @ApiResponse({status: HttpStatus.OK, type: PermissionDto, description: 'Update permission.'})
    @Post('/update')
    async update(@Body() permission: UpdatePermissionDto): Promise<PermissionDto> {
        return await this.permissionService.update(permission);
    }

    @ApiOperation({summary: 'Delete Permission.'})
    @ApiResponse({status: HttpStatus.OK, type: PermissionDto, description: 'Delete permission.'})
    @Delete('/delete/:id')
    async delete(@Param('id') id: string): Promise<boolean> {
        return await this.permissionService.deleteById(id);
    }

}