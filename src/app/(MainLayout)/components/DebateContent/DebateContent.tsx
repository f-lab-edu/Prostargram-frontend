import clsx from 'clsx';

import { digitNumberFormatter } from '@/utils/formatter';

import BlueFlag from '@/assets/icons/blue_flag.svg';
import BlueFillFlag from '@/assets/icons/blue_flag_fill.svg';
import RedFlag from '@/assets/icons/red_flag.svg';
import RedFillFlag from '@/assets/icons/red_flag_fill.svg';
import FeedCommentList from '../FeedCommentList';

import styles from './DebateContent.module.scss';
import FeedCommentWriteInput from '../FeedCommentWriteInput';

export interface DebateOptionType {
  optionId: number;
  optionContent: string;
  voteCount: number;
}

interface DebateContentProps {
  index: number;
  option: DebateOptionType;
  isSelected?: boolean;
  ratio: number;
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
  index,
  option,
  isSelected,
  ratio,
}: DebateContentProps) => {
  const { optionContent, voteCount } = option;

  const currentFlagType = index === 1 ? 'BLUE' : ('RED' as const);
  const FLAG = FLAG_SET[currentFlagType];

  const currentColor = currentFlagType === 'BLUE' ? styles.blue : styles.red;

  return (
    <div className={styles.container}>
      <div className={clsx(styles.debate_container, currentColor)}>
        <h2>{optionContent}</h2>
        <div className={styles.vote_count}>
          {isSelected ? <FLAG.FILL /> : <FLAG.NORMAL />}
          {digitNumberFormatter(voteCount)}
        </div>
        <div
          className={clsx(styles.vote, currentColor)}
          style={{ width: `${ratio}%` }}
        />
      </div>
      <div className={styles.comment_container}>
        <FeedCommentList feedId="1" feedCommentIds={['1', '2', '3']} />
      </div>
      <div>
        <FeedCommentWriteInput postId={1} placeholder="댓글 달기..." />
      </div>
    </div>
  );
};

export default DebateContent;
