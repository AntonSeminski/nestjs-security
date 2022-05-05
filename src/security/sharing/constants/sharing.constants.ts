import {SharingTypes} from "../../../entities";

const ACCESS_STAGE = {
    GLOBAL: 'globalSharingAccess',
    SINGLE: 'singleSharingAccess',
    ARRAY: 'arraySharingAccess'
}

const AUTOMATED_SHARING_TYPES = [
    SharingTypes.OWNER, SharingTypes.ROLE
]

const SHARED_TO_TYPES = {
    ROLE: 'role',
    ROLE_LEVEL: 'roleLevel',
    OWNER: '_id'
}

export {
    ACCESS_STAGE,
    AUTOMATED_SHARING_TYPES,
    SHARED_TO_TYPES
}