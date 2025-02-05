import Logout from '@/assets/icons/logout.svg';
import ToggleButton from '@/components/common/ToggleButton/ToggleButton';
import styles from './SettingMenu.module.scss';

const SettingMenu = () => {
  return (
    <ul className={styles.menu}>
      <li className={styles.menu_item}>
        <div>다크 모드</div>
        <ToggleButton onText="dark" offText="light" />
      </li>
      <li className={styles.menu_item}>
        <Logout />
        <div className={styles.logout}>로그아웃</div>
      </li>
    </ul>
  );
};

export default SettingMenu;
