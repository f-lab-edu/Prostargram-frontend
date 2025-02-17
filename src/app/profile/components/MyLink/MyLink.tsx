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

const makeArrayExcludeB = <T,>(A: T[], B: T[]) =>
  A.filter((link) => !B.includes(link));

const MyLink = ({ links, isMine }: MyLinkProps) => {
  const [myLinks, setMyLinks] = useState<string[]>(links);
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

    const needToAddLinks = makeArrayExcludeB(currentLinks, links);
    const needToRemoveLinks = makeArrayExcludeB(links, currentLinks);

    requestSaveSocialAccounts({
      targetSocialAccounts: needToAddLinks,
      onError: () => setMyLinks(links),
    });

    requestRemoveSocialAccounts({
      targetSocialAccounts: needToRemoveLinks,
      onError: () => setMyLinks(links),
    });

    setMyLinks(currentLinks);
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
            <ReadOnlyMyLinkList links={myLinks} />
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
