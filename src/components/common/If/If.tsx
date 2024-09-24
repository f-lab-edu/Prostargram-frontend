import { PropsWithChildren, createContext, useContext } from 'react';

type IfContextType = boolean;

const IfContext = createContext<IfContextType | null>(null);

const useIfContext = () => {
  return useContext(IfContext);
};

const IfProvider = ({
  children,
  condition,
}: PropsWithChildren & { condition: boolean }) => {
  return <IfContext.Provider value={condition}>{children}</IfContext.Provider>;
};

interface IfProps extends PropsWithChildren {
  condition: boolean;
}

const Condition = ({ condition, children }: IfProps) => {
  return <IfProvider condition={condition}>{children}</IfProvider>;
};

const True = ({ children }: PropsWithChildren) => {
  const condition = useIfContext();

  return condition && children;
};

const False = ({ children }: PropsWithChildren) => {
  const condition = useIfContext();

  return !condition && children;
};

const If = Object.assign(Condition, {
  True,
  False,
});

export default If;
