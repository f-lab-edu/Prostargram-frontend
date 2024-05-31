'use client';

import { ChangeEvent, useState } from 'react';

import { updateMyLinks } from '@/api/my';
import EditMyLinks from './EditMyLinks';
import ReadMyLinks from './ReadMyLinks';

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
      {isEdit ? (
        <EditMyLinks links={myLinks} onToggle={toggleEdit} />
      ) : (
        <ReadMyLinks links={myLinks} onToggle={toggleEdit} />
      )}
    </form>
  );
};

export default MyLink;
