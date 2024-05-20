import { createContext, useContext } from 'react';

export interface MyLinkContextType {
  isEdit: boolean;
  myLinks: string[];
  updateMyLinks: (links: string[]) => void;
  toggleIsEdit: () => void;
}

export const MyLinkContext = createContext<MyLinkContextType | null>(null);

const useMyLinkContext = () => {
  const context = useContext(MyLinkContext);

  if (!context) {
    throw new Error(
      'There is a React Component that is not children of MyLinkContext',
    );
  }

  return context;
};

export default useMyLinkContext;
