export class ObjectService {
    addProperty = (key, value, objectToAddTo = {}): any => {
        if (value) objectToAddTo[key] = value;

        return objectToAddTo;
    }
}
