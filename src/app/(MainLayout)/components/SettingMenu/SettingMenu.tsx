import Logout from '@/assets/icons/logout.svg';
import styles from './SettingMenu.module.scss';

const SettingMenu = () => {
  return (
    <ul className={styles.menu}>
      <li className={styles.menu_item}>다크 모드</li>
      <li className={styles.menu_item}>
        <Logout />
        <span className={styles.logout}>로그아웃</span>
      </li>
    </ul>
  );
};

export default SettingMenu;
