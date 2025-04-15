import clsx from 'clsx';

import { digitNumberFormatter } from '@/utils/formatter';

import BlueFlag from '@/assets/icons/blue_flag.svg';
import BlueFillFlag from '@/assets/icons/blue_flag_fill.svg';
import RedFlag from '@/assets/icons/red_flag.svg';
import RedFillFlag from '@/assets/icons/red_flag_fill.svg';
import { getUserId } from '@/utils/manageToken';
import { useVoteDebateFeed } from '@/api/feed/feedMutations';
import { useQueryClient } from '@tanstack/react-query';
import { FEED_QUERY_KEYS } from '@/api/feed/feedQueries';
import FeedCommentList from '../FeedCommentList';

import styles from './DebateContent.module.scss';
import FeedCommentWriteInput from '../FeedCommentWriteInput';
import { DebateOptionType } from '../../types/feed';

interface DebateContentProps {
  postId: number;
  index: number;
  option: DebateOptionType;
  isSelected?: boolean;
  ratio: number;
  disabled?: boolean;
}

const FLAG_SET = {
  BLUE: {
    NORMAL: BlueFlag,
    FILL: BlueFillFlag,
  },
  RED: {
    NORMAL: RedFlag,
    FILL: RedFillFlag,
  },
};

const DebateContent = ({
  postId,
  index,
  option,
  ratio,
  isSelected,
  disabled,
}: DebateContentProps) => {
  const { optionContent, voteCount } = option;
  const userId = getUserId();

  const currentFlagType = index === 1 ? 'BLUE' : ('RED' as const);
  const FLAG = FLAG_SET[currentFlagType];

  const currentColor = currentFlagType === 'BLUE' ? styles.blue : styles.red;
  const queryClient = useQueryClient();

  const { mutate: voteMutation } = useVoteDebateFeed(postId, userId, {
    onSuccess: () => {
      // 상세피드 캐시 초기화
      queryClient.invalidateQueries({
        queryKey: FEED_QUERY_KEYS.id(String(postId)),
      });
    },
  });

  console.log('option,,', option.optionId);

  return (
    <div className={styles.container}>
      <div className={clsx(styles.debate_container, currentColor)}>
        <h2>{optionContent}</h2>
        <div className={styles.vote_count}>
          {isSelected ? (
            <FLAG.FILL />
          ) : (
            <FLAG.NORMAL
              style={{ cursor: 'pointer' }}
              onClick={() => voteMutation(option.optionId)}
            />
          )}
          {digitNumberFormatter(voteCount)}
        </div>
        <div
          className={clsx(styles.vote, currentColor)}
          style={{ width: `${ratio}%` }}
        />
      </div>
      <div className={styles.comment_container}>
        <FeedCommentList
          feedId={postId.toString()}
          feedCommentIds={['1', '2', '3']}
        />
      </div>
      <div>
        <FeedCommentWriteInput
          postId={postId}
          optionId={option.optionId}
          placeholder={
            disabled
              ? '댓글 달기...'
              : '다른 의견에 동의하셔서 입력하실 수 없습니다.'
          }
          disabled={!disabled}
        />
      </div>
    </div>
  );
};

export default DebateContent;
