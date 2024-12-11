// global.d.ts
export {};

declare global {

  type IAppTheme = typeof import('@app/theme').lightTheme | typeof import('@app/theme').darkTheme;

  namespace ReactNativePaper {
    interface Theme {
      myRandomProperty: boolean;
    }
  }

  type IThemeType = 'light' | 'dark' | 'auto' | null | undefined;

}