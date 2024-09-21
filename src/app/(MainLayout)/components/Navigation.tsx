'use client';

import { useState } from 'react';
import Link from 'next/link';
import clsx from 'clsx';
import HomeIcon from '@/assets/icons/nav-home.svg';
import ProfileIcon from '@/assets/icons/nav-profile.svg';
import FeedIcon from '@/assets/icons/nav-feed.svg';
import SettingIcon from '@/assets/icons/nav-setting.svg';
import styles from './navigation.module.scss';

const Navigation = () => {
  // TODO: 추후 menu url 수정 필요
  const menus = [
    {
      name: '홈',
      url: '/',
      icon: <HomeIcon />,
    },
    {
      name: '프로필',
      url: '/',
      icon: <ProfileIcon />,
    },
    {
      name: '새 피드',
      url: '/',
      icon: <FeedIcon />,
    },
    {
      name: '설정',
      url: '/',
      icon: <SettingIcon />,
    },
  ];

  const [activeMenu, setActiveMenu] = useState(0);

  const handleMenuClick = (idx: number) => {
    setActiveMenu(idx);
  };

  return (
    <nav className={styles.nav}>
      <div className={styles.logo}>Prostagram</div>
      <ul className={styles.menu}>
        {menus.map((menu, idx) => {
          return (
            <li
              className={clsx(styles.menu_item, {
                [styles.active]: activeMenu === idx,
              })}
            >
              <Link href={menu.url} onClick={() => handleMenuClick(idx)}>
                {menu.icon}
                <span>{menu.name}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Navigation;
