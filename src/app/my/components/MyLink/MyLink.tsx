'use client';

import { ChangeEvent, useState } from 'react';

import { updateMyLinks } from '@/api/my';
import Button from '@/components/common/Button';
import EditMyLinkList from './EditMyLinkList';
import ReadOnlyMyLinkList from './ReadOnlyMyLinkList';

import * as Styles from './MyLink.css';

interface MyLinkProps {
  links: string[];
}

const MyLink = ({ links }: MyLinkProps) => {
  const [myLinks, setMyLinks] = useState(links);
  const [isEdit, setIsEdit] = useState<boolean>(false);

  const toggleEdit = () => setIsEdit((prev) => !prev);

  const saveLinks = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const submittedValue = [...formData.values()].filter((v) => Boolean(v));

    if (submittedValue.length) {
      const result = await updateMyLinks(submittedValue);
      setMyLinks(result);
    }

    toggleEdit();
  };

  return (
    <form onSubmit={saveLinks} className={Styles.myLinkContainer}>
      {isEdit && (
        <>
          <ul className={Styles.iconWithMyLinkWrapper}>
            <EditMyLinkList links={myLinks} />
          </ul>
          <div className={Styles.editButtonWrapper}>
            <Button type="submit" className={Styles.editButton}>
              저장
            </Button>
            <Button
              type="button"
              className={Styles.editButton}
              onClick={toggleEdit}
            >
              취소
            </Button>
          </div>
        </>
      )}

      {!isEdit && (
        <>
          <ul className={Styles.iconWithMyLinkWrapper}>
            <ReadOnlyMyLinkList links={myLinks} />
          </ul>
          <div className={Styles.editButtonWrapper}>
            <Button
              key="editButton"
              type="button"
              className={Styles.editButton}
              onClick={toggleEdit}
            >
              수정
            </Button>
          </div>
        </>
      )}
    </form>
  );
};

export default MyLink;
