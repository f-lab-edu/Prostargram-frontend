import clsx from 'clsx';
import Link from 'next/link';
import { ModalMenuType } from '../../types/main';
import styles from '../Menu/Menu.module.scss';

type ModalMenuProps = {
  modalMenus: ModalMenuType[];
  mode: string;
};

const ModalMenu = ({ modalMenus, mode }: ModalMenuProps) => {
  const setModalComponentByMode = () => {
    if (mode === 'basic') {
      return modalMenus.find((menu) => menu.name === '일반 피드 작성')
        ?.component;
    }
    if (mode === 'debate') {
      return modalMenus.find((menu) => menu.name === '토론 피드 작성')
        ?.component;
    }
    return null;
  };

  const isActive = (menu: ModalMenuType) => {
    if (mode === 'basic') {
      return menu.name === '일반 피드 작성';
    }
    if (mode === 'debate') {
      return menu.name === '토론 피드 작성';
    }
    return false;
  };

  return (
    <ul className={styles.menu}>
      {modalMenus.map((menu) => {
        return (
          <Link href={menu.url} key={`${menu.name}`}>
            <li
              className={clsx(styles.menu_item, {
                [styles.active]: isActive(menu),
              })}
            >
              {menu.icon}
              <span>{menu.name}</span>
              {setModalComponentByMode()}
            </li>
          </Link>
        );
      })}
    </ul>
  );
};

export default ModalMenu;
