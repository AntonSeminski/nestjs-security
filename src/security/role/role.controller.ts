import {Body, Controller, Get, HttpStatus, Param, Post, UseInterceptors} from "@nestjs/common";
import {RoleService} from "./role.provider";
import {RoleDto} from "../../entities";
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {InmostTransactionManager} from "@asemin/nestjs-utils";
import {UpdateRoleDto} from "./dto/update-role.dto";

@ApiTags('Role')
@UseInterceptors(InmostTransactionManager)
@Controller('role')
export class RoleController {
    constructor(private roleService: RoleService) {}

    @ApiOperation({summary: `Get Role Hierarchy.`})
    @ApiResponse({status: HttpStatus.OK, description: `Get Role Hierarchy.`})
    @Get('/get/hierarchy')
    async getHierarchy(): Promise<any> {
        return await this.roleService.getHierarchy();
    }

    @ApiOperation({summary: `Get Above Roles.`})
    @ApiResponse({status: HttpStatus.OK, description: `Get Above Roles.`})
    @Get('/get/above/:roleId')
    async getAboveRoles(@Param('roleId') roleId: string): Promise<any> {
        return await this.roleService.getAboveRoles(roleId);
    }

    @ApiOperation({summary: `Get All Roles.`})
    @ApiResponse({status: HttpStatus.OK, type: [RoleDto], description: `Get All Roles.`})
    @Get('/get/all')
    async getAll(): Promise<RoleDto[]> {
        return await this.roleService.getAll();
    }

    @ApiOperation({summary: `Create a Role.`})
    @ApiResponse({status: HttpStatus.OK, type: RoleDto, description: `Create a Role.`})
    @Post('/create')
    async create(@Body() role: RoleDto): Promise<RoleDto>{
        return await this.roleService.create(role);
    }

    @ApiOperation({summary: `Update Role.`})
    @ApiResponse({status: HttpStatus.OK, type: RoleDto, description: `Update Role.`})
    @Post('/update')
    async update(@Body() role: UpdateRoleDto): Promise<RoleDto>{
        return await this.roleService.update(role);
    }
}