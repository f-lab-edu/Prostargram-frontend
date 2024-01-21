import { useState, ReactNode } from 'react';

interface ToggleWrapperProps {
  children(props: { isToggle: boolean; toggleHandler: () => void }): ReactNode;
}

const ToggleWrapper = ({ children }: ToggleWrapperProps) => {
  const [isToggle, setIsToggle] = useState(false);
  const toggleHandler = () => setIsToggle((prev) => !prev);

  return children({ isToggle, toggleHandler });
};

export default ToggleWrapper;
