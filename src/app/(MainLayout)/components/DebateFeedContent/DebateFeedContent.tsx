import { useMemo } from 'react';

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

  const sortedOptions = useMemo(() => {
    return debate?.options?.slice().sort((a, b) => a.optionId - b.optionId);
  }, [debate?.options]);

  return (
    <div className={styles.debate_wrap}>
      <div className={styles.blue_area}>
        <Typo as="div" fontSize="body-32" textAlign="center">
          {sortedOptions?.[0].optionContent}
        </Typo>
        {sortedOptions?.[0].optionId === debate.selectedOptionId ? (
          <BlueFillFlag />
        ) : (
          <BlueFlag onClick={() => voteMutation(sortedOptions?.[0].optionId)} />
        )}
      </div>
      <div className={styles.red_area}>
        <Typo as="div" fontSize="body-32" textAlign="center">
          {sortedOptions?.[1].optionContent}
        </Typo>
        {sortedOptions?.[1].optionId === debate.selectedOptionId ? (
          <RedFillFlag />
        ) : (
          <RedFlag onClick={() => voteMutation(sortedOptions?.[1].optionId)} />
        )}
      </div>
    </div>
  );
};

export default DebateFeedContent;
