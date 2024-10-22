import clsx from 'clsx';
import { ModalMenuType } from '../../@types/main';
import styles from '../Menu/Menu.module.scss';

type ModalMenuProps = {
  modalMenus: ModalMenuType[];
};

const ModalMenu = ({ modalMenus }: ModalMenuProps) => {
  return (
    <ul className={styles.menu}>
      {modalMenus.map((menu) => {
        return (
          <button
            key={`${menu.name}`}
            onClick={() => {
              if (!menu.modalStatus && menu.setComponentStatus)
                menu.setComponentStatus(menu.name);
            }}
          >
            <li className={clsx(styles.menu_item)}>
              {menu.icon}
              <span>{menu.name}</span>
              {menu.modalStatus && menu.component}
            </li>
          </button>
        );
      })}
    </ul>
  );
};

export default ModalMenu;
