/* eslint-disable no-continue */
import get from '../methods/get';

export default class Templator {
  private readonly PROPERTY_REGEXP: RegExp = /\{\{(.*?)\}\}/gi;

  private readonly template: string;

  private readonly context: object;

  constructor(data: { template: string, context: object }) {
    this.template = data.template;
    this.context = data.context;
  }

  public compile() {
    return this.compileTemplate();
  }

  private compileTemplate() {
    return this.attachContext(this.template);
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
}
