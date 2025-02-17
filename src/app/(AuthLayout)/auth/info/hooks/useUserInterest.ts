import { useCallback, useMemo, useState } from 'react';

import { generateId } from '@/utils/create';
import { UserInterestType, UserInterestsType } from '../types/info';

const MY_INTERESTS_FIELDS_LIMIT = 10;

const useUserInterest = () => {
  const [userInterests, setUserInterests] = useState<UserInterestsType>({
    recommended: [],
    user: [],
  });

  const currentInterestList = useMemo(
    () => [...userInterests.user, ...userInterests.recommended],
    [userInterests],
  );

  const currentInterestStringList = useMemo(
    () => [
      ...new Set([
        ...userInterests.user.map(({ interestName }) => interestName),
        ...userInterests.recommended.map(({ interestName }) => interestName),
      ]),
    ],
    [userInterests],
  );

  const isMaxInterestCount =
    currentInterestStringList.length >= MY_INTERESTS_FIELDS_LIMIT;

  const addInterest = useCallback(
    (type: 'user' | 'recommended', interestName?: string) => {
      if (isMaxInterestCount) return;

      const newInterest = {
        id: generateId(),
        interestName: interestName ?? '',
      };

      setUserInterests((prev) => ({
        ...prev,
        [type]: [...prev[type], newInterest],
      }));
    },
    [isMaxInterestCount],
  );

  const removeUserInterest = useCallback((removeTargetId: string) => {
    setUserInterests(({ recommended, user }) => ({
      recommended: recommended.filter(({ id }) => id !== removeTargetId),
      user: user.filter(({ id }) => id !== removeTargetId),
    }));
  }, []);

  const updateUserInterest = useCallback((field: UserInterestType) => {
    const newUserInterests: UserInterestType[] = [];

    setUserInterests(({ recommended, user }) => ({
      recommended,
      user: user.reduce((acc, cur) => {
        if (cur.id === field.id) {
          const duplicateInterests = acc.filter(
            (target) => target.interestName === cur.interestName,
          ).length;
          if (duplicateInterests > 0) {
            return acc;
          }

          acc.push(field);
          return acc;
        }

        acc.push(cur);
        return acc;
      }, newUserInterests),
    }));
  }, []);

  return {
    userInterests,
    currentInterestList,
    currentInterestStringList,
    isMaxInterestCount,
    addInterest,
    removeUserInterest,
    updateUserInterest,
  };
};

export default useUserInterest;
