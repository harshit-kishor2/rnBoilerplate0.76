import React, {
  createContext,
  useContext,
  useMemo,
  useState
} from 'react';

interface IDemoContext {
  currentState: any;
  setCurrentState: (props: any) => void;
}

const DemoContext = createContext<IDemoContext | undefined>(undefined);

export const useDemoContext = (): IDemoContext => {
  const context = useContext(DemoContext);
  if (!context) {
    throw new Error(
      'useDemoContext must be used within DemoProvider. ' +
      'Make sure you have wrapped your app with DemoProvider.',
    );
  }
  return context;
};

export const DemoProvider = ({children}: React.PropsWithChildren) => {

  const [currentState, setCurrentState] = useState<any>('');

  //! You can put here extra logic for global state management


  // Memoize the context value to optimize performance
  const value = useMemo(
    () => ({
      currentState: currentState,
      setCurrentState: setCurrentState,
    }),
    [currentState, setCurrentState]
  );

  // Provide the demo context to children components
  return (
    <DemoContext.Provider value={value}>
      {children}
    </DemoContext.Provider>
  );
};
