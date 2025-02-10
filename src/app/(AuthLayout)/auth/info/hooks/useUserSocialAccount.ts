import { useCallback, useState } from 'react';

import { generateId } from '@/utils/create';
import { UserSocialAccountType } from '../types/info';

const useUserSocialAccount = () => {
  const [userSocialAccounts, setUserSocialAccounts] = useState<
    UserSocialAccountType[]
  >([{ id: generateId(), socialAccount: '' }]);

  const addUserSocialAccount = useCallback(() => {
    setUserSocialAccounts((prev) => [
      ...prev,
      { id: generateId(), socialAccount: '' },
    ]);
  }, []);

  const removeUserSocialAccount = useCallback((removeTargetId: string) => {
    setUserSocialAccounts((prev) =>
      prev.filter(({ id }) => id !== removeTargetId),
    );
  }, []);

  return { userSocialAccounts, addUserSocialAccount, removeUserSocialAccount };
};

export default useUserSocialAccount;
