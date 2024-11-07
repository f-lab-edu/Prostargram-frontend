import Image from 'next/image';
import Typo from '@/components/common/Typo';
import styles from './FeedProfile.module.scss';
import { BasicUser } from '../../types/feed';

type FeedProfileProps = {
  userInfo: BasicUser;
};

const FeedProfile = ({ userInfo }: FeedProfileProps) => {
  return (
    <>
      {userInfo.profileImgUrl === '' && (
        <Image
          className={styles.feed_top_profile}
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4vkwPhD-NHO6sV_3ailgWXjiP_WPM24J3IhkB3xZ-bQ&s"
          alt=""
          width="50"
          height="50"
        />
      )}
      {/* TODO: profileImgUrl src 적용 */}
      {userInfo.profileImgUrl !== '' && (
        <Image
          className={styles.feed_top_profile}
          src=""
          alt=""
          width="50"
          height="50"
        />
      )}
      <Typo as="span" className={styles.username} fontSize="body-20">
        {userInfo.userName}
      </Typo>
    </>
  );
};

export default FeedProfile;
