import {
  FC,
  PropsWithChildren,
  ReactNode,
  Children,
  isValidElement,
} from 'react';

interface IfProps extends PropsWithChildren {
  condition: boolean;
}

interface IfComponent extends FC<IfProps> {
  True: FC<PropsWithChildren>;
  False: FC<PropsWithChildren>;
}

const If: IfComponent = ({ condition, children }: IfProps): ReactNode => {
  const filteredChildren: ReactNode = Children.toArray(children).filter(
    (child) => {
      if (isValidElement(child)) {
        return condition ? child.type === If.True : child.type === If.False;
      }
      return false;
    },
  );

  return filteredChildren;
};

If.True = function True({ children }: PropsWithChildren): ReactNode {
  return children;
};
If.False = function False({ children }: PropsWithChildren): ReactNode {
  return children;
};

export default If;
