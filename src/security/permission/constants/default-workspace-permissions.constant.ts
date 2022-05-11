import {SystemPermissionNames, PermissionTypes} from "@jira-killer/constants";

export const DEFAULT_WORKSPACE_PERMISSIONS = [
    {
        label: "Invite Users",
        apiName: SystemPermissionNames.INVITE,
        description: "This permission allows to invite users to workspace.",
        type: PermissionTypes.SYSTEM,
        volume: ""
    },
    {
        label: "Fire Users",
        apiName: SystemPermissionNames.FIRE,
        description: "This permission allows to fire users from workspace.",
        type: PermissionTypes.SYSTEM,
        volume: ""
    }
]