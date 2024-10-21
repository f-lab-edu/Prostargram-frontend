import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import styles from './Menu.module.scss';
import { MenuType } from '../../@types/main';

type MenuProps = {
  menus: MenuType[];
};

const Menu = ({ menus }: MenuProps) => {
  const pathname = usePathname();

  return (
    <ul className={styles.menu}>
      {menus.map((menu) => {
        return (
          <Link key={`${menu.name}`} href={menu.url}>
            <li
              className={clsx(styles.menu_item, {
                [styles.active]: pathname === menu.url,
              })}
            >
              {menu.icon}
              <span>{menu.name}</span>
            </li>
          </Link>
        );
      })}
    </ul>
  );
};

export default Menu;
