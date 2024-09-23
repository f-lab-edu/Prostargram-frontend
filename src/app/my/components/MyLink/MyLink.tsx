'use client';

import { ChangeEvent, useState } from 'react';

import { updateMyLinks } from '@/api/my';
import Button from '@/components/common/Button';
import EditMyLinkList from './EditMyLinkList';
import ReadOnlyMyLinkList from './ReadOnlyMyLinkList';

import styles from './MyLink.module.scss';

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
    <form onSubmit={saveLinks} className={styles.my_link_container}>
      {isEdit && (
        <>
          <ul className={styles.icon_with_my_link_wrapper}>
            <EditMyLinkList links={myLinks} />
          </ul>
          <div className={styles.edit_button_wrapper}>
            <Button type="submit" className={styles.edit_button}>
              저장
            </Button>
            <Button
              type="button"
              className={styles.edit_button}
              onClick={toggleEdit}
            >
              취소
            </Button>
          </div>
        </>
      )}

      {!isEdit && (
        <>
          <ul className={styles.icon_with_my_link_wrapper}>
            <ReadOnlyMyLinkList links={myLinks} />
          </ul>
          <div className={styles.edit_button_wrapper}>
            <Button
              key="editButton"
              type="button"
              className={styles.edit_button}
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
