import {SystemPermissionNames, PermissionTypes} from "@jira-killer/constants";

export const DEFAULT_TASK_PERMISSIONS = [
    {
        label: "Manage Fields",
        apiName: SystemPermissionNames.MANAGE_FIELDS,
        description: "This permission allows to manage fields.",
        type: PermissionTypes.SYSTEM,
        volume: ""
    },
    {
        label: "Manage Objects",
        apiName: SystemPermissionNames.MANAGE_OBJECTS,
        description: "This permission allows to manage objects.",
        type: PermissionTypes.SYSTEM,
        volume: ""
    }
]