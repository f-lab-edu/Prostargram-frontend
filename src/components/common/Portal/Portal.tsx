import { ReactNode, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

interface IPortalProps {
  children: ReactNode;
}

const Portal = ({ children }: IPortalProps) => {
  const [element, setElement] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setElement(document.getElementById('portal'));
  }, []);

  if (!element) {
    return null;
  }

  return ReactDOM.createPortal(children, element);
};

export default Portal;
