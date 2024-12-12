/* eslint-disable no-unused-vars */
import React, {
  createContext,
  useContext,
  useMemo,
  useState
} from 'react';

interface DemoContextType {
  currentState: any;
  setCurrentState: (props: any) => void;
}

export const DemoContext = createContext<DemoContextType | undefined>(undefined);

export const useDemoContext = (): DemoContextType => {
  const context = useContext(DemoContext);
  if (!context) {
    throw new Error(
      'useDemoContext must be used within DemoContextProvider. ' +
        'Make sure you have wrapped your app with DemoContextProvider.',
    );
  }
  return context;
};

export const DemoContextProvider = ({ children }: React.PropsWithChildren) => {

  const [currentState, setCurrentState] = useState<any>('');

  // You can put here extra logic for global state management


  // Memoize the context value to optimize performance
  const value = useMemo(
    () => ({
      currentState: currentState,
      setCurrentState: setCurrentState,
    }),
    [currentState,setCurrentState]
  );

  // Provide the demo context to children components
  return (
    <DemoContext.Provider value={value}>
      {children}
    </DemoContext.Provider>
  );
};
