export function stringToObject(str) {
    let result = {};

    if (str && typeof str === 'string') {
        const objStr = str.match(/{(.)+}/g);
        eval('result =' + objStr);
    }

    return result
}