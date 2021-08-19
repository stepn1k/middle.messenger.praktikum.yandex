import { get } from '../methods/get';
import { stringToObject } from '../methods/string-to-obj';

export default class Templator {
    PROPERTY_REGEXP = /\{\{(.*?)\}\}/gi;

    constructor(data) {
        this._template = data.template;
        this._context = data.context;
        this._declatedComponents = data.declaredComponents;
    }

    compile() {
        return this._compileTemplate();
    }

    _compileTemplate() {
        let template = this._template;
        let key = null;
        const regExp = this.PROPERTY_REGEXP;
        // attach data
        while ((key = regExp.exec(template))) {
            if (key[1]) {
                const tmplValue = key[1].trim();
                const data = get(this._context, tmplValue);
                if (typeof data === 'function') {
                    window[tmplValue] = data;
                    template = template.replace(new RegExp(key[0], 'gi'), `window.${key[1].trim()}()`);
                    continue;
                }
                template = template.replace(new RegExp(key[0], 'gi'), data);
            }
        }
        // attach custom components
        if (this._declatedComponents !== undefined) {
            // get component from "declared components" array
            for (const key in this._declatedComponents) {
                const component = this._declatedComponents[key];
                // get selector and context of this component
                const { context, selector } = component();
                // searching for this component in template ( <custom-component props="..." /> )
                const COMPONENT_REGEXP = new RegExp(`<${selector} .*?\/>`);
                while (template.match(COMPONENT_REGEXP)) {
                    // extract inline props
                    const entry = template.match(COMPONENT_REGEXP)[0];
                    let stringProps = entry.match(new RegExp(/props="(.*?)"/));
                    stringProps = stringProps ? stringProps[1] : {}; // (if inline styles don't exist)
                    // create component template with context and inline props
                    const componentTemplate = new Templator(component(Object.assign(context || {}, stringToObject(stringProps))));
                    const componentTemplateForRender = componentTemplate.compile();
                    // replace custom tag with template
                    template = template.replace(COMPONENT_REGEXP, componentTemplateForRender);
                }
            }
        }
        return template;
    }
}