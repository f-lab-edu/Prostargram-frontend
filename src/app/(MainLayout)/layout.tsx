import { ReactNode } from 'react';

interface MainLayoutProps {
  children?: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return <div>{children}</div>;
};

export default MainLayout;
