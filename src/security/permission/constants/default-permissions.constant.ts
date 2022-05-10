import {SystemPermissionNamesEnum} from "./system-permission-names.constant";
import {PERMISSION_TYPES} from "./security.constants";

export const DEFAULT_PERMISSIONS = [
    {
        label: "Manage Fields",
        apiName: SystemPermissionNamesEnum.MANAGE_FIELDS,
        description: "This permission allows to manage fields.",
        type: PERMISSION_TYPES.SYSTEM,
        volume: ""
    },
    {
        label: "Manage Objects",
        apiName: SystemPermissionNamesEnum.MANAGE_OBJECTS,
        description: "This permission allows to manage objects.",
        type: PERMISSION_TYPES.SYSTEM,
        volume: ""
    },
    {
        label: "Invite Users",
        apiName: SystemPermissionNamesEnum.INVITE,
        description: "This permission allows to invite users to workspace.",
        type: PERMISSION_TYPES.SYSTEM,
        volume: ""
    },
    {
        label: "Fire Users",
        apiName: SystemPermissionNamesEnum.FIRE,
        description: "This permission allows to fire users from workspace.",
        type: PERMISSION_TYPES.SYSTEM,
        volume: ""
    },
]