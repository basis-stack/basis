interface IClientModuleConfig {

  key: string,

  // TODO: Define proper types for these
  route: any,
  reducers: any
}

interface IClientModule {

  // TODO: Define IClientModuleActions for this
  actions: any;
  initialise(param?: any): IClientModuleConfig;
}

declare module 'basis-client' {

  // TODO: Declare a type (React Component / React Element) for app
  export function initialise(modules: Array<IClientModuleConfig>, app: any, themeConfig?: any): void;
  export const routeTypes: {
    page: string,
    shellHub: string
  }
}

declare module 'basis-client/modules' {

  export const core: IClientModule;
}

declare module 'basis-client/components' {

  // TODO: Declare this as a proper type (i.e. React.SFC<>)
  export const RootRouter: any;
}