import { ReactNode } from 'react';
import Wrapper from './components/Wrapper';

interface MainLayoutProps {
  children?: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return <Wrapper>{children}</Wrapper>;
};

export default MainLayout;
