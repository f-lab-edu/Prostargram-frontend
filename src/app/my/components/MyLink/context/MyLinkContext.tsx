import { createContext, useContext } from 'react';

export interface MyLinkContextType {
  isModify: boolean;
  myLinks: string[];
  updateMyLinks: (links: string[]) => void;
  toggleIsModify: () => void;
}

export const MyLinkContext = createContext<MyLinkContextType | null>(null);

const useMyLinkContext = () => {
  const context = useContext(MyLinkContext);

  if (!context) {
    throw new Error('There is not in MyLinkContext Scope');
  }

  return context;
};

export default useMyLinkContext;
