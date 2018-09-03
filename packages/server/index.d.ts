declare module 'basis-server/decorators' {

  export function Controller(path: string): any;
  export function Middleware(middleware: any): any;
  export function Get(path?: string): any;
}