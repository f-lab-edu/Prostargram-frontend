import { RECOMMANED_INTERESTS } from '@/data/mock';

import { UserInterestType } from '../../types/info';
import InterestCheckbox from '../InterestCheckbox';

interface RecommandedInterestsProps {
  isMax: boolean;
  interests: UserInterestType[];
  addInterest: (type: 'user' | 'recommended', interestName?: string) => void;
  removeInterest: (removeTargetId: string) => void;
}

const RecommandedInterests = ({
  isMax,
  interests,
  addInterest,
  removeInterest,
}: RecommandedInterestsProps) => {
  return RECOMMANED_INTERESTS.map((interest) => {
    const findedInterestId = interests.find(
      ({ interestName }) => interestName === interest,
    )?.id;

    const removeInterestIfinterestIsMatched = () => {
      if (findedInterestId) {
        removeInterest(findedInterestId);
      }
    };

    return (
      <InterestCheckbox
        key={interest}
        value={interest}
        isMax={isMax}
        isCheckedInterest={Boolean(findedInterestId)}
        onClickWithChecked={removeInterestIfinterestIsMatched}
        onClickWithUnchecked={() => addInterest('recommended', interest)}
      />
    );
  });
};

export default RecommandedInterests;
