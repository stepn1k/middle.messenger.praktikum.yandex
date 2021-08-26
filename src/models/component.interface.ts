export interface ComponentInterface {
    selector?: string;
    template: string;
    context: object;
    declaredComponents?: ((context?: object) => ComponentInterface)[];
}