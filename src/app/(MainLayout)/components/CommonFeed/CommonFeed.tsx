import { useState } from 'react';
import Modal from '@/components/common/Modal';
import useImageUpload from '@/hooks/useImageUpload';
import style from './CommonFeed.module.scss';
import AddImage from '../AddImage/AddImage';
import AddContent from '../AddContent/AddContent';

type CommonFeedStep = '이미지추가' | '게시글작성';

const CommonFeed = () => {
  const [step, setStep] = useState<CommonFeedStep>('이미지추가');
  const {
    images,
    currentImage,
    selectImageFile,
    setCurrentImage,
    removeImage,
  } = useImageUpload();

  return (
    <Modal width="900px" onClose={() => {}}>
      <div className={style.content_wrapper}>
        {step === '이미지추가' && (
          <AddImage
            images={images}
            currentImage={currentImage}
            selectImageFile={selectImageFile}
            setCurrentImage={setCurrentImage}
            removeImage={removeImage}
            onNext={() => {
              setStep('게시글작성');
            }}
          />
        )}
        {step === '게시글작성' && (
          <AddContent
            images={images}
            currentImage={currentImage}
            setCurrentImage={setCurrentImage}
            onPrev={() => {
              setStep('이미지추가');
            }}
            onNext={() => {
              console.log('게시');
            }}
          />
        )}
      </div>
    </Modal>
  );
};

export default CommonFeed;
