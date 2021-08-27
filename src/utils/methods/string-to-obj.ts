export default function stringToObject(str: string): Object {
  // create valid JSON object
  return JSON.parse(str
  // between double-quotes
    .replace(/:\s*"([^"]*)"/g, (_match, p1) => `: "${p1.replace(/:/g, '@colon@')}"`)
  // between single-quotes
    .replace(/:\s*'([^']*)'/g, (_match, p1) => `: "${p1.replace(/:/g, '@colon@')}"`)
  // Add double-quotes around any tokens before the remaining ":"
    .replace(/(['"])?([a-z0-9A-Z_]+)(['"])?\s*:/g, '"$2": ')
  // Turn "@colon@" back into ":"
    .replace(/@colon@/g, ':'));
}
