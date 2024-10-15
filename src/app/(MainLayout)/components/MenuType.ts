import { ReactNode } from 'react';

type MenuType = {
  name: string;
  type: string;
  url: string;
  icon: ReactNode;
  order: number;
};

type ModalMenuType = {
  name: string;
  type: string;
  url: string;
  icon: ReactNode;
  component?: ReactNode;
  modalStatus?: boolean;
  setComponentStatus?: (str: string) => void;
  order: number;
};

export type { MenuType, ModalMenuType };
