'use client';

import Link from 'next/link';
import { ChangeEvent, FormEvent, useState } from 'react';

import Button from '@/components/common/Button';
import Input from '@/components/common/Input';

import { flexCenter } from '@/styles/common.css';
import * as Styles from './MyLink.css';

const ICON_LIST = ['github', 'naver'];

interface SocialAccountProps {
  link: string;
  isEdit: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const SocialAccount = ({ link, isEdit, onChange }: SocialAccountProps) => {
  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e);
  };

  return (
    <li key={link} className={Styles.myLinkInputWrapper}>
      <i className={flexCenter}>
        {ICON_LIST.find((target) => link.includes(target)) || 'default'}
      </i>
      {isEdit ? (
        <>
          <Input
            variants="noneBorder"
            size="small"
            className={Styles.myLinkInput}
            onChange={changeHandler}
            defaultValue={link}
          />
          <Button
            type="button"
            fill="red"
            className={`${flexCenter} ${Styles.remoteButton}`}
          >
            X
          </Button>
        </>
      ) : (
        <Link className={Styles.myLink} href={link}>
          <p>{link}</p>
        </Link>
      )}
    </li>
  );
};

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

  return (
    <form className={Styles.myLinkContainer} onSubmit={saveLinks}>
      <ul className={Styles.iconWithMyLinkWrapper}>
        {myLinks.map((link, index) => (
          <SocialAccount
            key="link"
            link={link}
            isEdit={isEdit}
            onChange={(e) => changeHandler(e, index)}
          />
        ))}

        {myLinks.length < 3 && (
          <Button type="button" fill="white" size="small">
            +
          </Button>
        )}
      </ul>

      <div className={Styles.editButtonWrapper}>
        {isMine && isEdit ? (
          <>
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
          </>
        ) : (
          <Button className={Styles.editButton} onClick={toggleEdit}>
            수정
          </Button>
        )}
      </div>
    </form>
  );
};

export default MyLink;
