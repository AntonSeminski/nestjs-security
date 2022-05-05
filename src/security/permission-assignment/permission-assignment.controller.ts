import {Body, Controller, Delete, Get, HttpStatus, Param, Post, Req, UseGuards, UseInterceptors} from "@nestjs/common";
import {PermissionAssignmentService} from "./permission-assignment.provider";
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {PermissionAssignmentDto} from "../../entities";
import {WorkspaceAuthGuard} from "../../common";
import {SharedTransactionManager} from "@asemin/nestjs-utils";

@ApiTags('PermissionAssignment')
@UseGuards(WorkspaceAuthGuard)
@UseInterceptors(SharedTransactionManager)
@Controller('permissionAssignment')
export class PermissionAssignmentController {
    constructor(private permissionAssignmentService: PermissionAssignmentService) {}

    @ApiOperation({summary: 'Get all Permission Assignments.'})
    @ApiResponse({status: HttpStatus.OK, type: [PermissionAssignmentDto], description: 'Retrieve all permissions available.'})
    @Get('get/all')
    async getAll(): Promise<PermissionAssignmentDto[]> {
        return await this.permissionAssignmentService.getAll();
    }

    @ApiOperation({summary: 'Get all permission assignments for user.'})
    @ApiResponse({})
    @Get('get/all/user')
    async getAllByPermissionSets(@Req() request) {
        const userPermissionSets = [...request.user.permissionSets, request.user.profile];

        return await this.permissionAssignmentService.getAllByPermissionSets(userPermissionSets);
    }

    @ApiOperation({summary: 'Create Permission Assignment.'})
    @ApiResponse({status: HttpStatus.OK, type: PermissionAssignmentDto, description: 'Create Permission Assignment.'})
    @Post('/create')
    async create(@Body() permission: PermissionAssignmentDto): Promise<PermissionAssignmentDto> {
        return await this.permissionAssignmentService.create(permission);
    }


    @ApiOperation({summary: 'Delete Permission Assignment.'})
    @ApiResponse({status: HttpStatus.OK, type: Boolean, description: 'Delete Permission Assignment.'})
    @Delete('/delete/:id')
    async delete(@Param('id') id: string): Promise<boolean> {
        return await this.permissionAssignmentService.deleteById(id);
    }
}