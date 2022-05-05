import {Body, Controller, Get, Post, Req, UseInterceptors} from "@nestjs/common";
import {SharingService} from "./sharing.provider";
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {SharingDto} from "../../entities";
import {InmostTransactionManager} from "@asemin/nestjs-utils";

@ApiTags('Sharing')
@UseInterceptors(InmostTransactionManager)
@Controller('sharing')
export class SharingController {
    constructor(private sharingService: SharingService) {
    }

    @ApiOperation({summary: 'Get all Sharing.'})
    @ApiResponse({type: [SharingDto], description: 'Get all Sharing.'})
    @Get('get/all')
    async getAll(): Promise<SharingDto[]> {
        return await this.sharingService.getAll();
    }

    @Post('/create')
    async create(@Body() sharing: SharingDto): Promise<SharingDto> {
        return await this.sharingService.create(sharing);
    }
}