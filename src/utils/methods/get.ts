export function get(obj: Object, path: string): Object {
    const keys = path.split('.');

    let result: { [key: string]: any } = obj;

    for (let key of keys) {
        const value = result[key];

        if (!value) {
            return undefined;
        }

        result = value;
    }

    return result;
};