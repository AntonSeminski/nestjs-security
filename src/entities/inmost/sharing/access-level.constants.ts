export enum AccessLevels {
    NONE = 'None',
    READ = 'Read',
    EDIT = 'Edit'
}

export const AccessLevelValue = {
    none: 0,
    read: 1,
    edit: 2,
}

export const isGreaterAccess =
    (first: AccessLevels | string, second: AccessLevels | string) => AccessLevelValue[first?.toLowerCase()] > AccessLevelValue[second?.toLowerCase()];


export const hasAccess =
    (expected: AccessLevels | string, real: AccessLevels | string) => AccessLevelValue[real?.toLowerCase()] >= AccessLevelValue[expected?.toLowerCase()];


