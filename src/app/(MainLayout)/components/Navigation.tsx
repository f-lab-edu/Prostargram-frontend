'use client';

import { ReactNode, SetStateAction, useState } from 'react';
import Link from 'next/link';
import clsx from 'clsx';
import HomeIcon from '@/assets/icons/nav-home.svg';
import ProfileIcon from '@/assets/icons/nav-profile.svg';
import SettingIcon from '@/assets/icons/nav-setting.svg';
import DiscussionFeedIcon from '@/assets/icons/nav-discussion-feed.svg';
import CommonFeedIcon from '@/assets/icons/nav-common-feed.svg';
import Modal from '@/components/common/Modal';
import styles from './navigation.module.scss';

type MenuType = {
  name: string;
  type: string;
  url: string;
  icon: ReactNode;
  component?: ReactNode;
  modalStatus?: boolean;
  setComponentStatus?: React.Dispatch<SetStateAction<boolean>>;
};

const Navigation = () => {
  const [disscussionModal, setDisscussionModal] = useState(false);
  const [commonModal, setCommonModal] = useState(false);

  const closeDisscussionModal = () => {
    setDisscussionModal(false);
  };

  const closeCommonModal = () => {
    setCommonModal(false);
  };

  // TODO: 추후 menu url 수정 필요, 모달 대체 필요
  const menus: MenuType[] = [
    {
      name: '홈',
      type: 'page',
      url: '/',
      icon: <HomeIcon />,
    },
    {
      name: '프로필',
      type: 'page',
      url: '/',
      icon: <ProfileIcon />,
    },
    {
      name: '일반 피드 작성',
      type: 'modal',
      url: '/',
      icon: <CommonFeedIcon />,
      component: (
        <Modal onClose={closeCommonModal}>일반피드로 대체 예정입니다</Modal>
      ),
      modalStatus: commonModal,
      setComponentStatus: setCommonModal,
    },
    {
      name: '토론 피드 작성',
      type: 'modal',
      url: '/',
      icon: <DiscussionFeedIcon />,
      component: (
        <Modal onClose={closeDisscussionModal}>
          토론 피드로 대체 예정입니다
        </Modal>
      ),
      modalStatus: disscussionModal,
      setComponentStatus: setDisscussionModal,
    },
    {
      name: '설정',
      type: 'page',
      url: '/',
      icon: <SettingIcon />,
    },
  ];

  const [activeMenu, setActiveMenu] = useState(0);

  const handleMenuClick = (menu: MenuType, idx: number) => {
    if (menu.type === 'modal' && menu.setComponentStatus) {
      menu.setComponentStatus(true);
    }

    if (menu.type === 'page') {
      setActiveMenu(idx);
    }
  };

  return (
    <nav className={styles.nav}>
      <div className={styles.logo}>Prostagram</div>
      <ul className={styles.menu}>
        {menus.map((menu, idx) => {
          return (
            <li
              key={`${menu.name}`}
              className={clsx(styles.menu_item, {
                [styles.active]: activeMenu === idx && menu.type === 'page',
              })}
            >
              <Link href={menu.url} onClick={() => handleMenuClick(menu, idx)}>
                {menu.icon}
                <span>{menu.name}</span>
              </Link>
              {menu.type === 'modal' && menu.modalStatus && menu.component}
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Navigation;
