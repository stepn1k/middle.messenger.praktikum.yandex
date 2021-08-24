export function stringToObject(str) {
    if (str && typeof str === 'string') {
        // create valid JSON object
        const updatedStr = str
            // between double-quotes
            .replace(/:\s*"([^"]*)"/g, (match, p1) => ': "' + p1.replace(/:/g, '@colon@') + '"')
            // between single-quotes
            .replace(/:\s*'([^']*)'/g, (match, p1) => ': "' + p1.replace(/:/g, '@colon@') + '"')
            // Add double-quotes around any tokens before the remaining ":"
            .replace(/(['"])?([a-z0-9A-Z_]+)(['"])?\s*:/g, '"$2": ')
            // Turn "@colon@" back into ":"
            .replace(/@colon@/g, ':');
        return JSON.parse(updatedStr);
    }
}