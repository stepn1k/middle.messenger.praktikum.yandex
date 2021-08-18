import { get } from '../methods/get';

export default class Templator {
    PROPERTY_REGEXP = /\{\{(.*?)\}\}/gi;

    constructor(data) {
        this._template = data.template;
        this._context = data.context;
        this._components = data.components;
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
        // attach components
        if (this._components !== undefined) {
            for (const componentName in this._components) {
                // compile component template
                const componentTemplate = new Templator(this._components[componentName]);
                const componentTemplateForRender = componentTemplate.compile();
                // replace custom tag with component template
                const componentSelector = this._components[componentName].selector;
                const COMPONENT_REGEXP = new RegExp(`<${componentSelector}\/>`, 'gi');
                template = template.replace(COMPONENT_REGEXP, componentTemplateForRender);
            }
        }
        return template;
    }
}