// global.d.ts
export {};

declare global {

  type AppTheme = typeof import('@app/theme').lightTheme | typeof import('@app/theme').darkTheme;

  namespace ReactNativePaper {
    interface Theme {
      myRandomProperty: boolean;
    }
  }

}