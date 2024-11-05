import BlueFlag from '@/assets/icons/blue_flag.svg';
import RedFlag from '@/assets/icons/red_flag.svg';
import Typo from '@/components/common/Typo';
import { Post } from '../../types/feed';
import styles from './DebateFeedContent.module.scss';

type DebateFeedContentProps = {
  debate: Post;
};

const DebateFeedContent = ({ debate }: DebateFeedContentProps) => {
  return (
    <div className={styles.debate_wrap}>
      <div className={styles.blue_area}>
        <Typo as="div" fontSize="body-32" textAlign="center">
          {debate?.options?.[0].optionContent}
        </Typo>
        <BlueFlag />
      </div>
      <div className={styles.red_area}>
        <Typo as="div" fontSize="body-32" textAlign="center">
          {debate?.options?.[1].optionContent}
        </Typo>
        <RedFlag />
      </div>
    </div>
  );
};

export default DebateFeedContent;
