import {AccessLevels, hasAccess, isGreaterAccess} from "../../../entities";
import {ACCESS_STAGE} from "../constants";

const hasSingleAccess = (request, requiredAccessLevel: AccessLevels | string) => {
    const singleAccess = request[ACCESS_STAGE.SINGLE];

    return hasGlobalAccess(request, requiredAccessLevel) || hasAccess(requiredAccessLevel, singleAccess);
}

const hasArrayAccess = (request, requiredAccessLevel: AccessLevels | string) => {
    const bestAccessByEntity: Map<string, string> = request[ACCESS_STAGE.ARRAY];

    return hasGlobalAccess(request, requiredAccessLevel) || bestAccessByEntity?.size > 0
}

const hasGlobalAccess = (request, requiredAccessLevel: AccessLevels | string) => {
    const globalAccess = request[ACCESS_STAGE.GLOBAL];

    return hasAccess(requiredAccessLevel, globalAccess);
}

const setGlobalAccess = (request, accessLevel: AccessLevels | string) => {
    request[ACCESS_STAGE.GLOBAL] = accessLevel;
}

const setSingleAccess = (request, accessLevel: AccessLevels | string) => {
    request[ACCESS_STAGE.SINGLE] = accessLevel;
}

const setArrayAccess = (request, accesses: Map<string, string>) => {
    const currentAccess = request[ACCESS_STAGE.ARRAY];

    if (!currentAccess || currentAccess.size === 0)
        request[ACCESS_STAGE.ARRAY] = accesses;

    accesses.forEach(((value, key) =>
            isGreaterAccess(currentAccess.get(key), value)
                ? currentAccess.set(key, value)
                : null
    ));
}

const getArrayAccess = (request): Map<string, string> => request[ACCESS_STAGE.ARRAY];

const getIdFromRequest = (request, idName: string = '') => {
    const idFromBody = request.body?.[idName] || request.body?._id || request.body?.id;

    const idFromParameters = request.params[idName] || request.params['id'] || request.params.find(param => param.endsWith('id'));

    const idFromQuery = request.query[idName] || request.query['id'];


    return idFromBody || idFromParameters || idFromQuery;
}

const getIdsFromRequest = (request, idName: string = '') => {
    return request.body?.map(entity => entity[idName])
        || request.body?.map(entity => entity._id)
        || request.body?.map(entity => entity.id);
}

export {
    hasSingleAccess, hasGlobalAccess,hasArrayAccess,
    hasAccess,
    setGlobalAccess, setSingleAccess, setArrayAccess,
    getIdsFromRequest, getIdFromRequest, getArrayAccess
}