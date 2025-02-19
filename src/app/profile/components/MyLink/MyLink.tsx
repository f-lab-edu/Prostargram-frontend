'use client';

import { ChangeEvent, useState } from 'react';

import If from '@/components/common/If';
import Button from '@/components/common/Button';
import useSocialAccountsServerRequest from '@/hooks/useSocialAccountsServerRequests';
import EditMyLinkList from './EditMyLinkList';
import ReadOnlyMyLinkList from './ReadOnlyMyLinkList';

import styles from './MyLink.module.scss';

interface MyLinkProps {
  links: string[];
  isMine: boolean;
}

const getAllExcluded = <T extends string>(A: T[], B: T[]) => {
  // B의 요소 개수 카운트 (currentLinks)
  const bCountMap = B.reduce(
    (acc, link) => {
      acc[link] = (acc[link] || 0) + 1;
      return acc;
    },
    {} as Record<T, number>,
  );

  const result: T[] = [];

  A.forEach((link) => {
    if (bCountMap[link]) {
      bCountMap[link] -= 1; // B에 존재하면 개수 차감
    } else {
      result.push(link); // 개수가 0이면 결과 배열에 추가
    }
  });

  return result;
};

const MyLink = ({ links, isMine }: MyLinkProps) => {
  const [myLinks, setMyLinks] = useState<string[]>(() => links);
  const [isEdit, setIsEdit] = useState<boolean>(false);

  const { requestSaveSocialAccounts, requestRemoveSocialAccounts } =
    useSocialAccountsServerRequest();

  const toggleEdit = () => setIsEdit((prev) => !prev);

  const saveLinks = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const currentLinks = [...formData.values()]
      .filter((v) => Boolean(v))
      .map((link) => link.toString());

    const needToAddLinks = getAllExcluded(currentLinks, myLinks);
    const needToRemoveLinks = getAllExcluded(myLinks, currentLinks);

    //! if) myLinks = ['naver.com', 'naver.com'], then 하나만 삭제 시, 적용 불가능 `includes` 로직만으로는 해결 불가능
    // console.log('myLinks', myLinks);
    // console.log('prop Links', links);
    // console.log('currentLinks', currentLinks);
    // console.log('add links', needToAddLinks);
    // console.log('remove links', needToRemoveLinks);

    if (needToAddLinks.length !== 0 || needToRemoveLinks.length !== 0) {
      requestRemoveSocialAccounts({
        targetSocialAccounts: needToRemoveLinks,
        onSuccess: () => {
          requestSaveSocialAccounts({
            targetSocialAccounts: needToAddLinks,
            onError: () => setMyLinks(links),
          });
        },
        onError: () => setMyLinks(links),
      });

      setMyLinks(currentLinks);
    }

    toggleEdit();
  };

  return (
    <form onSubmit={saveLinks} className={styles.my_link_container}>
      <ul className={styles.icon_with_my_link_wrapper}>
        <If condition={isEdit}>
          <If.True>
            <EditMyLinkList links={myLinks} />
          </If.True>
          <If.False>
            <ReadOnlyMyLinkList isMine={isMine} links={myLinks} />
          </If.False>
        </If>
      </ul>
      <div className={styles.edit_button_wrapper}>
        {isMine && (
          <If condition={isEdit}>
            <If.True>
              <Button type="submit" className={styles.edit_button}>
                저장
              </Button>
              <Button
                type="button"
                fill="gray"
                className={styles.edit_button}
                onClick={toggleEdit}
              >
                취소
              </Button>
            </If.True>
            <If.False>
              <Button
                key="editButton"
                type="button"
                className={styles.edit_button}
                onClick={toggleEdit}
              >
                수정
              </Button>
            </If.False>
          </If>
        )}
      </div>
    </form>
  );
};

export default MyLink;
