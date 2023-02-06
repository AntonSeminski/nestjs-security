import {isHasEmpty} from "@asemin/nestjs-utils";

export class ObjectUtil {
    static map(objects: Array<any>, key: string, value: string) {
        if (isHasEmpty(objects, key, value)) return {};

        const result = {};

        objects.forEach(object => {
            result[key] = object[value];
        });

        return result;
    }

    static mapBy(objects: Array<any>, key: string) {
        if (isHasEmpty(objects, key)) return {};

        const result = {};

        objects.forEach(object => {
            result[key] = object;
        });

        return result;
    }
}