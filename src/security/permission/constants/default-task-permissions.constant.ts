import {ESystemPermissionNames, EPermissionTypes} from "@jira-killer/constants";

export const DEFAULT_TASK_PERMISSIONS = [
    {
        label: "Manage Fields",
        apiName: ESystemPermissionNames.ManageFields,
        description: "This permission allows to manage fields.",
        type: EPermissionTypes.System,
        volume: ""
    },
    {
        label: "Manage Objects",
        apiName: ESystemPermissionNames.ManageObjects,
        description: "This permission allows to manage objects.",
        type: EPermissionTypes.System,
        volume: ""
    }
]