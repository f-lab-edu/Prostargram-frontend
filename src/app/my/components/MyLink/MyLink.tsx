import * as Styles from './MyLink.css';

const ICON_LIST = ['github', 'naver'];

interface MyLinkProps {
  children?: string;
}

const MyLink = ({ children }: MyLinkProps) => {
  const icon =
    ICON_LIST.find((target) => children?.includes(target)) || 'default';

  return (
    <div className={Styles.iconWithLinkWrapper}>
      <span>{icon}</span>
      <p className={Styles.myLink}>{children}</p>
    </div>
  );
};

export default MyLink;
