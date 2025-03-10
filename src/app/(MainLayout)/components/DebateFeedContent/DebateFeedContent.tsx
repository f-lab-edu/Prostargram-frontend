import BlueFlag from '@/assets/icons/blue_flag.svg';
import BlueFillFlag from '@/assets/icons/blue_flag_fill.svg';
import RedFlag from '@/assets/icons/red_flag.svg';
import RedFillFlag from '@/assets/icons/red_flag_fill.svg';
import Typo from '@/components/common/Typo';
import { useVoteDebateFeed } from '@/api/feed/feedMutations';
import { getUserId } from '@/utils/manageToken';
import { useQueryClient } from '@tanstack/react-query';
import { FEED_QUERY_KEYS } from '@/api/feed/feedQueries';

import styles from './DebateFeedContent.module.scss';

type DebateFeedContentProps = {
  debate: Feed.DebatePost;
};

const DebateFeedContent = ({ debate }: DebateFeedContentProps) => {
  console.log('debate::', debate);
  const userId = getUserId();
  const queryClient = useQueryClient();

  const { mutate: voteMutation } = useVoteDebateFeed(debate.postId, userId, {
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: FEED_QUERY_KEYS.feeds,
      });
    },
  });

  return (
    <div className={styles.debate_wrap}>
      <div className={styles.blue_area}>
        <Typo as="div" fontSize="body-32" textAlign="center">
          {debate?.options?.[0].optionContent}
        </Typo>
        {debate?.options?.[0].optionId === debate.selectedOptionId ? (
          <BlueFillFlag />
        ) : (
          <BlueFlag
            onClick={() => voteMutation(debate?.options?.[0].optionId)}
          />
        )}
      </div>
      <div className={styles.red_area}>
        <Typo as="div" fontSize="body-32" textAlign="center">
          {debate?.options?.[1].optionContent}
        </Typo>
        {debate?.options?.[1].optionId === debate.selectedOptionId ? (
          <RedFillFlag />
        ) : (
          <RedFlag
            onClick={() => voteMutation(debate?.options?.[1].optionId)}
          />
        )}
        <RedFlag />
      </div>
    </div>
  );
};

export default DebateFeedContent;
