import { get } from '../methods/get';
import { stringToObject } from '../methods/string-to-obj';
import { ComponentInterface } from '../../models/component.interface';

export default class Templator {
    private readonly PROPERTY_REGEXP: RegExp = /\{\{(.*?)\}\}/gi;
    private readonly STRUCTURE_REGEXP: RegExp = /(<FOR_STRUCTURE ARRAY="(.*?)">((.|\n)*?)<\/FOR_STRUCTURE>)/gi;

    private readonly _template: string;
    private readonly _context: Object;
    private readonly _declaredComponents: (() => ComponentInterface)[];

    constructor(data: ComponentInterface) {
        this._template = data.template;
        this._context = data.context;
        this._declaredComponents = data.declaredComponents;
    }

    compile() {
        return this._compileTemplate();
    }

    _compileTemplate() {
        let template = this._template;

        let propertyKey = null;
        const propertyRegExp = this.PROPERTY_REGEXP;

        let forStructure = null;
        const structureRegExp = this.STRUCTURE_REGEXP;

        // copy template inside <FOR_structure> container
        while ((forStructure = structureRegExp.exec(template))) {
            const [, templateWithContainer, iterableArrayName, templateToCopy] = forStructure;
            const arrayInContext = this._context[iterableArrayName];
            let copiedTemplate = ``;
            for (let i = 0; i < arrayInContext.length; i++) {
                copiedTemplate += templateToCopy;
                copiedTemplate = copiedTemplate.replace(new RegExp(`INDEX`, 'g'), i.toString());
            }
            template = template.replace(templateWithContainer, copiedTemplate);
        }

        // attach data
        while ((propertyKey = propertyRegExp.exec(template))) {
            if (propertyKey[1]) {
                const tmplValue = propertyKey[1].trim();
                const data = get(this._context, tmplValue);
                if (typeof data === 'function') {
                    // @ts-ignore
                    window[tmplValue] = data;
                    template = template.replace(new RegExp(propertyKey[0], 'gi'), `window.${propertyKey[1].trim()}()`);
                    continue;
                }
                if (data) {
                    template = template.replace(new RegExp(propertyKey[0], 'gi'), data.toString());
                }
            }
        }

        // attach custom components
        if (this._declaredComponents !== undefined) {
            // get component from "declared components" array
            for (const key in this._declaredComponents) {
                const component = this._declaredComponents[key];
                // get selector and context of this component
                const {context, selector} = component();
                // searching for this component in template ( <custom-component props="..." /> )
                const COMPONENT_REGEXP = new RegExp(`<${selector} .*?\/>`);
                while (template.match(COMPONENT_REGEXP)) {
                    // extract inline props
                    const entry = template.match(COMPONENT_REGEXP)[0];
                    const regExpPropsArray: RegExpMatchArray = entry.match(new RegExp(/props="(.*?)"/));
                    const stringProps = regExpPropsArray ? regExpPropsArray[1] : '{}'; // (if inline styles don't exist)
                    // create component template with context and inline props
                    const props = Object.assign(context || {}, stringToObject(stringProps));
                    // @ts-ignore
                    const componentTemplate = new Templator(component(props));
                    const componentTemplateForRender = componentTemplate.compile();
                    // replace custom tag with template
                    template = template.replace(COMPONENT_REGEXP, componentTemplateForRender);
                }
            }
        }
        return template;
    }
}