import { ChangeEvent, useEffect, useState } from 'react';
import BlueFlag from '@/assets/icons/blue_flag.svg';
import RedFlag from '@/assets/icons/red_flag.svg';
import Typo from '@/components/common/Typo';
import Textarea from '@/components/common/Textarea/Textarea';
import styles from './DebateSubject.module.scss';

type DebateSubjectProps = {
  updateSubject: (sub: [string, string]) => void;
};

const DebateSubject = ({ updateSubject }: DebateSubjectProps) => {
  const [subject, setSubject] = useState<[string, string]>(['', '']);

  useEffect(() => {
    updateSubject(subject);
  }, [subject]);

  return (
    <div className={styles.left_content}>
      {/* 주제영역 */}
      <div className={styles.subject_box}>
        <div className={styles.subject1}>
          <BlueFlag />
          <Textarea
            className={styles.textarea}
            placeholder="토론 주제 입력..."
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
              setSubject([e.target.value, subject[1]]);
            }}
            maxLength={35}
          />
        </div>
        <div className={styles.subject2}>
          <RedFlag />
          <Textarea
            className={styles.textarea}
            placeholder="토론 주제 입력..."
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
              setSubject([subject[0], e.target.value]);
            }}
            maxLength={35}
          />
        </div>
      </div>
      {/* 설명영역 */}
      <div className={styles.guide_box}>
        <Typo as="h1" fontSize="body-32" color="gray-2">
          토론할 주제를 입력해 주세요!
        </Typo>
        <Typo as="h2" fontSize="body-14" color="gray-4" marginTop="10px">
          민감한 주제나 타인을 비방하는 등의 주제는 <br />그 심각성에 따라
          <Typo as="span" fontSize="body-14" color="red">
            삭제 조치 및 탈퇴 처리
          </Typo>
          될 수 있음을 알려드립니다.
        </Typo>
      </div>
    </div>
  );
};

export default DebateSubject;
