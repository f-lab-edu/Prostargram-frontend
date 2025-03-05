import If from '@/components/common/If';
import Button from '@/components/common/Button';
import { UserInterestWithOptionalHashTagIdType } from '@/app/profile/types/profile';

import styles from './MyReadOnlyInterest.module.scss';

interface MyReadOnlyInterestProps {
  isMine: boolean;
  interests: UserInterestWithOptionalHashTagIdType[];
  toggleHandler: () => void;
}

const MyReadOnlyInterest = ({
  isMine,
  interests,
  toggleHandler,
}: MyReadOnlyInterestProps) => {
  return (
    <>
      <ul className={styles.interest_list}>
        <If condition={interests.length === 0}>
          <If.True>
            <li className={styles.none_interest}>
              <p>등록된 관심사가 없습니다.</p>
            </li>
          </If.True>
          <If.False>
            {interests.map(({ hashTagName }) => (
              <li key={hashTagName} className={styles.interest}>
                <span>#{hashTagName}</span>
              </li>
            ))}
          </If.False>
        </If>
      </ul>

      {isMine && (
        <div className={styles.edit_button_wrapper}>
          <Button onClick={toggleHandler}>수정</Button>
        </div>
      )}
    </>
  );
};

export default MyReadOnlyInterest;
