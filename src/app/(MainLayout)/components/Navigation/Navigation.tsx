'use client';

import { useState } from 'react';
import HomeIcon from '@/assets/icons/nav-home.svg';
import ProfileIcon from '@/assets/icons/nav-profile.svg';
import SettingIcon from '@/assets/icons/nav-setting.svg';
import DiscussionFeedIcon from '@/assets/icons/nav-discussion-feed.svg';
import CommonFeedIcon from '@/assets/icons/nav-common-feed.svg';
import Modal from '@/components/common/Modal';
import styles from './Navigation.module.scss';
import Menu from '../Menu/Menu';
import ModalMenu from '../ModalMenu/ModalMenu';
import { MenuType, ModalMenuType } from '../../@types/main';

type CombinedMenuType = MenuType | ModalMenuType;

const Navigation = () => {
  // TODO: 추후 menu url 수정 필요
  const menus: MenuType[] = [
    {
      name: '홈',
      type: 'page',
      url: '/',
      icon: <HomeIcon />,
      order: 1,
    },
    {
      name: '프로필',
      type: 'page',
      url: '/profile',
      icon: <ProfileIcon />,
      order: 2,
    },
    {
      name: '설정',
      type: 'page',
      url: '/settings',
      icon: <SettingIcon />,
      order: 5,
    },
  ];

  const [feedModal, setFeedModal] = useState<boolean | string>(false);

  const changeFeedModalStatus = (modalName: string) => {
    setFeedModal(modalName);
  };

  const closeModal = () => {
    setFeedModal(false);
  };

  const modalMenus: ModalMenuType[] = [
    {
      name: '일반 피드 작성',
      type: 'modal',
      url: '/',
      icon: <CommonFeedIcon />,
      component: <Modal onClose={closeModal}>일반피드로 대체 예정입니다</Modal>,
      modalStatus: feedModal === '일반 피드 작성',
      setComponentStatus: changeFeedModalStatus,
      order: 3,
    },
    {
      name: '토론 피드 작성',
      type: 'modal',
      url: '/',
      icon: <DiscussionFeedIcon />,
      component: (
        <Modal onClose={closeModal}>토론 피드로 대체 예정입니다</Modal>
      ),
      modalStatus: feedModal === '토론 피드 작성',
      setComponentStatus: changeFeedModalStatus,
      order: 4,
    },
  ];

  const combinedMenus: CombinedMenuType[] = [...menus, ...modalMenus].sort(
    (a, b) => a.order - b.order,
  );

  return (
    <nav className={styles.nav}>
      <div className={styles.logo}>Prostagram</div>
      {combinedMenus.map((menu) => {
        if (menu.type === 'page') {
          const pageMenu = menu as MenuType;
          // 페이지 메뉴일 경우 Menu 컴포넌트로 출력
          return <Menu key={menu.name} menus={[pageMenu]} />;
        }
        if (menu.type === 'modal') {
          // 모달 메뉴일 경우 ModalMenu 컴포넌트로 출력
          const modalMenu = menu as ModalMenuType;
          return <ModalMenu key={modalMenu.name} modalMenus={[modalMenu]} />;
        }
        return null;
      })}
    </nav>
  );
};

export default Navigation;
