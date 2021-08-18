export function get(obj, path) {
    if (typeof path !== 'string') {
        return undefined;
    }

    const keys = path.split('.');

    let result = obj;

    for (let key of keys) {
        const value = result[key];

        if (!value) {
            return undefined;
        }

        result = value;
    }

    return result;
};