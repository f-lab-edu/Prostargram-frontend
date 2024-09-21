import { ReactNode } from 'react';
import Wrapper from './components/Wrapper';
import Navigation from './components/Navigation';

interface MainLayoutProps {
  children?: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <Wrapper>
      <Navigation />
      {children}
    </Wrapper>
  );
};

export default MainLayout;
