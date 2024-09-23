import styles from './MyInformation.module.scss';

interface MyInformationProps {
  nickname: string;
  currentState: string;
  description: string;
}

const MyInformation = ({
  nickname,
  currentState,
  description,
}: MyInformationProps) => (
  <>
    <p className={styles.nickname}>{nickname}</p>
    <p className={styles.current_state}>{currentState}</p>
    <p className={styles.description}>{description}</p>
  </>
);

export default MyInformation;
