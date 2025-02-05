import clsx from 'clsx';
import Link from 'next/link';
import { Suspense } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

import { MenuType } from '../../types/main';
import SettingMenu from '../SettingMenu/SettingMenu';
import styles from './Menu.module.scss';

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
    <Suspense>
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
                  {menu.name === '설정' && mode === 'setting' && (
                    <SettingMenu />
                  )}
                </li>
              </Link>
            </>
          );
        })}
      </ul>
    </Suspense>
  );
};

export default Menu;
