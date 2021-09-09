/* eslint-disable no-continue */
import get from '../methods/get';

export default class Templator {
  private readonly PROPERTY_REGEXP: RegExp = /\{\{(.*?)\}\}/gi;

  private readonly template: string;

  private readonly context: object;

  private node: HTMLDivElement;

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

  private attachContext(templateToProcess: string): ChildNode {
    this.node = document.createElement('div');
    const regExp = this.PROPERTY_REGEXP;
    let template = templateToProcess;
    let propertyKey: any;
    const nodesToAttach = [];

    // attach data
    while ((propertyKey = regExp.exec(template))) {
      if (propertyKey[1]) {
        const tmplValue = propertyKey[1].trim();
        const data = get(this.context, tmplValue);
        // functions
        if (typeof data === 'function') {
          // @ts-ignore
          window[tmplValue] = data;
          template = template.replace(new RegExp(propertyKey[0], 'gi'), `window.${propertyKey[1].trim()}()`);
          continue;
        }
        // nodes
        if (data?.eventBus) {
          const block = data.render();
          nodesToAttach.push(block);
          const componentId = block.dataset.id;
          template = template.replace(new RegExp(propertyKey[0], 'gi'), `<template data-id="${componentId}"></template>`);
          continue;
        }
        // nodes array
        if (Array.isArray(data)) {
          data.forEach((node, index, array) => {
            const block = node.render();
            nodesToAttach.push(block);
            const componentId = block.dataset.id;
            let replacedValue = `<template data-id="${componentId}"></template>`;
            if (index !== array.length - 1) {
              replacedValue += (`\n${propertyKey[0]}`);
            }
            template = template.replace(new RegExp(propertyKey[0]), replacedValue);
          });
          continue;
        }
        // basic data
        if (data || data === '') {
          template = template.replace(new RegExp(propertyKey[0], 'gi'), data.toString());
        }
      }
    }
    this.node.innerHTML = template;
    nodesToAttach.forEach((node) => {
      const templateToReplace = this.node.querySelector(`[data-id='${node?.dataset.id}']`);
      templateToReplace?.parentNode?.replaceChild(node, templateToReplace);
    });
    return this.node.children[0];
  }
}
