import { createContext, useContext } from 'react';
import { IContext } from './types';

const Context = createContext<IContext | null>(null);

export const ContextProvider = Context.Provider;

export const useContextProvider = () => {
  const data = useContext(Context);

  if (!data) {
    throw new Error('Error data context');
  }

  return data;
};
