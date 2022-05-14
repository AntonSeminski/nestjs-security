import {ESystemPermissionNames, EPermissionTypes} from "@jira-killer/constants";

export const DEFAULT_WORKSPACE_PERMISSIONS = [
    {
        label: "Invite Users",
        apiName: ESystemPermissionNames.Invite,
        description: "This permission allows to invite users to workspace.",
        type: EPermissionTypes.System,
        volume: ""
    },
    {
        label: "Fire Users",
        apiName: ESystemPermissionNames.Fire,
        description: "This permission allows to fire users from workspace.",
        type: EPermissionTypes.System,
        volume: ""
    }
]