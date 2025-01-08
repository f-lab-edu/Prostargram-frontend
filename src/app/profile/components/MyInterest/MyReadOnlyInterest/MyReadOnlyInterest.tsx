import If from '@/components/common/If';
import Button from '@/components/common/Button';

import styles from './MyReadOnlyInterest.module.scss';

interface MyReadOnlyInterestProps {
  isMine: boolean;
  interests: string[];
  toggleHandler: () => void;
}

const MyReadOnlyInterest = ({
  isMine,
  interests,
  toggleHandler,
}: MyReadOnlyInterestProps) => {
  return (
    <>
      <ul className={styles.my_interest_list}>
        {interests.map((interest) => (
          <li key={interest} className={styles.my_interest}>
            #{interest}
          </li>
        ))}
      </ul>

      <If condition={isMine}>
        <If.True>
          <div className={styles.edit_button_wrapper}>
            <Button onClick={toggleHandler}>수정</Button>
          </div>
        </If.True>
      </If>
    </>
  );
};

export default MyReadOnlyInterest;
