'use client';

import Link from 'next/link';
import { ChangeEvent, FormEvent, useState } from 'react';

import Button from '@/components/common/Button';
import Input from '@/components/common/Input';

import { flexCenter } from '@/styles/common.css';
import * as Styles from './MyLink.css';

const ICON_LIST = ['github', 'naver'];

interface MyLinkProps {
  links: string[];
}

const MyLink = ({ links }: MyLinkProps) => {
  const [myLinks, setMyLinks] = useState<string[]>([...links]);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const isMine = true;

  const toggleEdit = () => setIsEdit((prev) => !prev);

  const saveLinks = (e: FormEvent<HTMLFormElement>) => {
    console.log('execute saveLinks function');
    e.preventDefault();
    setIsEdit(false);
  };

  const changeHandler = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    const next = [...myLinks];
    next[index] = e.target.value;
    setMyLinks(next);
  };

  return isEdit ? (
    <form className={Styles.myLinkContainer} onSubmit={saveLinks}>
      <ul className={Styles.iconWithMyLinkWrapper}>
        {myLinks.map((link, index) => (
          <li key={link} className={Styles.myLinkInputWrapper}>
            <i className={flexCenter}>
              {ICON_LIST.find((target) => link?.includes(target)) || 'default'}
            </i>
            <Input
              variants="noneBorder"
              size="small"
              className={Styles.myLinkInput}
              onChange={(e) => changeHandler(e, index)}
              defaultValue={link}
            />
            <Button
              type="button"
              fill="red"
              className={`${flexCenter} ${Styles.remoteButton}`}
            >
              X
            </Button>
          </li>
        ))}

        {myLinks.length < 3 && (
          <Button type="button" fill="white" size="small">
            +
          </Button>
        )}
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
    </form>
  ) : (
    <div className={Styles.myLinkContainer}>
      <ul className={Styles.iconWithMyLinkWrapper}>
        {myLinks.map((link) => (
          <li key={link} className={Styles.myLinkInputWrapper}>
            <i className={flexCenter}>
              {ICON_LIST.find((target) => link?.includes(target)) || 'default'}
            </i>
            <Link className={Styles.myLink} href={link}>
              <p>{link}</p>
            </Link>
          </li>
        ))}
      </ul>
      <div className={Styles.editButtonWrapper}>
        {isMine && (
          <Button className={Styles.editButton} onClick={toggleEdit}>
            수정
          </Button>
        )}
      </div>
    </div>
  );
};

export default MyLink;
