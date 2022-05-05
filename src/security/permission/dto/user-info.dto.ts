import {ApiProperty} from "@nestjs/swagger";
import {EntityDto} from "../../../entities";

export class UserInfoDto extends EntityDto{
    @ApiProperty({example: 'jack@sparrow'})
    username: string;

    @ApiProperty({example: '3123919292192929', description: 'Role Id'})
    role: string;

    @ApiProperty({example: '1', type: Number})
    roleLevel: number;

    @ApiProperty({example: '3123919292192929', description: 'Profile Id'})
    profile: string;

    @ApiProperty({example: ['3123919292192929', '3123919292192929'], description: 'Permission Set Ids'})
    permissionSets: [string];

    @ApiProperty({example: '3123919292192929', description: 'License Id'})
    license: string;

    @ApiProperty({example: ['Task', 'Base'], description: 'Features available for user!'})
    features: [string]

    constructor(userInfo: any) {
        super(userInfo);

        this._id = userInfo?._id;
        this.username = userInfo?.username;
        this.role = userInfo?.role;
        this.profile = userInfo?.profile;
        this.permissionSets = userInfo?.permissionSets;
        this.license = userInfo?.license;
        this.features = userInfo?.features;
        this.roleLevel = userInfo?.roleLevel;
    }
}