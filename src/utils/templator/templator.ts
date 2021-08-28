/* eslint-disable no-continue */
import get from '../methods/get';
import stringToObject from '../methods/string-to-obj';
import { ComponentInterface } from '../../models/component.interface';

export default class Templator {
  private readonly PROPERTY_REGEXP: RegExp = /\{\{(.*?)\}\}/gi;

  private readonly STRUCTURE_REGEXP: RegExp = /(<FOR_STRUCTURE ARRAY="(.*?)">((.|\n)*?)<\/FOR_STRUCTURE>)/gi;

  private readonly template: string;

  private readonly context: object;

  private readonly declaredComponents: (() => ComponentInterface)[];

  constructor(data: ComponentInterface) {
    this.template = data.template;
    this.context = data.context;
    this.declaredComponents = data.declaredComponents;
  }

  public compile() {
    return this.compileTemplate();
  }

  private compileTemplate() {
    let { template } = this;
    template = this.processForStructure(template);
    template = this.attachContext(template);
    template = this.attachCustomComponents(template);
    return template;
  }

  private processForStructure(templateToProcess: string): string {
    const regExp = this.STRUCTURE_REGEXP;
    let template = templateToProcess;
    let structureParams;

    while ((structureParams = regExp.exec(template))) {
      const [, templateWithContainer, iterableArrayName, templateToCopy] = structureParams;
      // @ts-ignore
      const arrayInContext = this.context[iterableArrayName];
      let copiedTemplate = '';
      for (let i = 0; i < arrayInContext.length; i++) {
        copiedTemplate += templateToCopy;
        copiedTemplate = copiedTemplate.replace(new RegExp('INDEX', 'g'), i.toString());
      }
      template = template.replace(templateWithContainer, copiedTemplate);
    }
    return template;
  }

  private attachContext(templateToProcess: string): string {
    const regExp = this.PROPERTY_REGEXP;
    let template = templateToProcess;
    let propertyKey;

    // attach data
    while ((propertyKey = regExp.exec(template))) {
      if (propertyKey[1]) {
        const tmplValue = propertyKey[1].trim();
        const data = get(this.context, tmplValue);
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
    return template;
  }

  private attachCustomComponents(templateToProcess: string): string {
    let template = templateToProcess;

    if (this.declaredComponents !== undefined) {
      // get component from "declared components" array
      for (const key in this.declaredComponents) {
        if (Object.prototype.hasOwnProperty.call(this.declaredComponents, key)) {
          const component = this.declaredComponents[key];
          // get selector and context of this component
          const { context, selector } = component();
          // searching for this component in template ( <custom-component props="..." /> )
          const COMPONENT_REGEXP = new RegExp(`<${selector} .*?/>`);
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
    }
    return template;
  }
}
