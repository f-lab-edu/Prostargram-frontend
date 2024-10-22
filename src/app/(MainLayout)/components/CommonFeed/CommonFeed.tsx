import { useState } from 'react';
import Modal from '@/components/common/Modal';
import style from './CommonFeed.module.scss';
import AddImage from '../AddImage/AddImage';

type CommonFeedStep = '이미지추가' | '게시글작성';

const CommonFeed = () => {
  const [step, setStep] = useState<CommonFeedStep>('이미지추가');

  return (
    <Modal width="900px" onClose={() => {}}>
      <div className={style.content_wrapper}>
        {step === '이미지추가' && (
          <AddImage
            onNext={() => {
              setStep('게시글작성');
            }}
          />
        )}
        {step === '게시글작성' && <AddImage />}
      </div>
    </Modal>
  );
};

export default CommonFeed;
