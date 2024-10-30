import { ReactNode } from 'react';
import Wrapper from './components/Wrapper/Wrapper';
import Navigation from './components/Navigation/Navigation';

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
