import { ReactNode, Suspense } from 'react';
import Wrapper from './components/Wrapper/Wrapper';
import Navigation from './components/Navigation/Navigation';

interface MainLayoutProps {
  children?: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <Wrapper>
      <Suspense>
        <Navigation />
        {children}
      </Suspense>
    </Wrapper>
  );
};

export default MainLayout;
