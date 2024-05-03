import * as Styles from './MyInformation.css';

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
    <p className={Styles.nickname}>{nickname}</p>
    <p className={Styles.currentState}>{currentState}</p>
    <p className={Styles.description}>{description}</p>
  </>
);

export default MyInformation;
