'use client';

import { useSearchParams } from 'next/navigation';
import HomeIcon from '@/assets/icons/nav-home.svg';
import ProfileIcon from '@/assets/icons/nav-profile.svg';
import SettingIcon from '@/assets/icons/nav-setting.svg';
import DiscussionFeedIcon from '@/assets/icons/nav-discussion-feed.svg';
import CommonFeedIcon from '@/assets/icons/nav-common-feed.svg';
import styles from './Navigation.module.scss';
import Menu from '../Menu/Menu';
import ModalMenu from '../ModalMenu/ModalMenu';
import { MenuType, ModalMenuType, ToggleMenuType } from '../../types/main';
import CommonFeed from '../CommonFeed/CommonFeed';
import DiscussionFeed from '../DebateFeed/DebateFeed';

type CombinedMenuType = MenuType | ModalMenuType | ToggleMenuType;

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
      url: '/my',
      icon: <ProfileIcon />,
      order: 2,
    },
    {
      name: '설정',
      type: 'page',
      url: '/?mode=setting',
      icon: <SettingIcon />,
      order: 5,
    },
  ];

  const searchParams = useSearchParams();
  const mode = searchParams.get('mode');
  const postId = searchParams.get('postId');

  const modalMenus: ModalMenuType[] = [
    {
      name: '일반 피드 작성',
      type: 'modal',
      url: `/?mode=basic${postId ? `&postId=${postId}` : ''}`,
      icon: <CommonFeedIcon />,
      component: <CommonFeed />,
      order: 3,
    },
    {
      name: '토론 피드 작성',
      type: 'modal',
      url: `/?mode=debate${postId ? `&postId=${postId}` : ''}`,
      icon: <DiscussionFeedIcon />,
      component: <DiscussionFeed />,
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
          return (
            <ModalMenu
              key={modalMenu.name}
              modalMenus={[modalMenu]}
              mode={mode ?? ''}
            />
          );
        }
        return null;
      })}
    </nav>
  );
};

export default Navigation;
