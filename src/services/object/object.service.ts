import {isHasEmpty} from "@asemin/nestjs-utils";

export class ObjectService {
    addProperty = (key, value, objectToAddTo = {}): any => {
        if (isHasEmpty(key, value)) return objectToAddTo;

        objectToAddTo[key] = value;

        return objectToAddTo;
    }
}
