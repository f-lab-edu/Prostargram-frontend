import { useState } from 'react';
import Modal from '@/components/common/Modal';
import useImageUpload from '@/hooks/useImageUpload';
import style from './CommonFeed.module.scss';
import AddImage from '../AddImage/AddImage';
import AddContent from '../AddContent/AddContent';
import { CommonFeedData, CommonFeedStep } from '../../@types/commonFeed';

const CommonFeed = () => {
  const [step, setStep] = useState<CommonFeedStep>('이미지추가');
  const {
    images,
    currentImage,
    selectImageFile,
    setCurrentImage,
    removeImage,
  } = useImageUpload();
  const [data, setData] = useState<CommonFeedData>({
    images,
    content: '',
    hashtag: [],
  });

  const createCommonFeed = () => {
    // TODO: 일반피드 작성 서버 API 연동
    console.log('데이터', data);
  };

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
            setData={setData}
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
            data={data}
            setData={setData}
            onPrev={() => {
              setStep('이미지추가');
            }}
            onNext={createCommonFeed}
          />
        )}
      </div>
    </Modal>
  );
};

export default CommonFeed;
