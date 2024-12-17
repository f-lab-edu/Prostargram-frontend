import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import clsx from 'clsx';
import styles from './Menu.module.scss';
import { MenuType } from '../../types/main';
import SettingMenu from '../SettingMenu/SettingMenu';

type MenuProps = {
  menus: MenuType[];
};

const Menu = ({ menus }: MenuProps) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const mode = searchParams.get('mode');

  const isActive = (menu: MenuType) => {
    if (mode === 'setting') {
      return menu.name === '설정';
    }
    if (mode === null) {
      return pathname === menu.url;
    }
    return false;
  };

  return (
    <ul className={styles.menu}>
      {menus.map((menu) => {
        return (
          <>
            <Link key={`${menu.name}`} href={menu.url}>
              <li
                className={clsx(styles.menu_item, {
                  [styles.active]: isActive(menu),
                })}
              >
                {menu.icon}
                <span>{menu.name}</span>
                {menu.name === '설정' && <SettingMenu />}
              </li>
            </Link>
          </>
        );
      })}
    </ul>
  );
};

export default Menu;
