import React, { SetStateAction, useState } from 'react';
import Modal from '@/components/common/Modal';
import useImageUpload from '@/hooks/useImageUpload';
import ConfirmPopup from '@/components/common/Popup/ConfirmPopup/ConfirmPopup';
import style from './CommonFeed.module.scss';
import AddImage from '../AddImage/AddImage';
import AddContent from '../AddContent/AddContent';
import {
  CommonFeedData,
  FeedPopup,
  CommonFeedStep,
  FeedImage,
} from '../../types/feed';

type CommonFeedProps = {
  modalStatus: boolean | string;
  setModalStatus: React.Dispatch<SetStateAction<boolean | string>>;
};

const CommonFeed = ({ modalStatus, setModalStatus }: CommonFeedProps) => {
  const [step, setStep] = useState<CommonFeedStep>('이미지추가');
  const {
    images,
    currentImage,
    selectImageFile,
    setCurrentImage,
    removeImage,
  } = useImageUpload();
  const [commonFeedData, setCommonFeedData] = useState<CommonFeedData>({
    images,
    content: '',
    hashtag: [],
  });

  const updateImages = (newImages: FeedImage[]) => {
    setCommonFeedData((prev) => ({
      ...prev,
      images: newImages,
    }));
  };

  const updateContents = (newContents: string) => {
    setCommonFeedData((prev) => ({
      ...prev,
      content: newContents,
    }));
  };

  const updateHashTags = (newHashtags: string[]) => {
    setCommonFeedData((prev) => ({
      ...prev,
      hashtag: newHashtags,
    }));
  };

  const [popupState, setPopupState] = useState<FeedPopup>(null);

  const handleCloseModal = () => setPopupState('confirm');
  const handleOpenPublishPopup = () => setPopupState('publish');
  const handleClosePopup = () => setPopupState(null);

  const createCommonFeed = () => {
    // TODO: 일반피드 작성 서버 API 연동
    console.log('데이터', setCommonFeedData);
    handleClosePopup();
    setModalStatus(false);
  };

  const handleDeleteFeed = () => {
    setModalStatus(false);
    handleClosePopup();
  };

  return (
    <>
      {modalStatus === '일반 피드 작성' && (
        <Modal width="900px" onClose={() => handleCloseModal()}>
          <div className={style.content_wrapper}>
            {step === '이미지추가' && (
              <AddImage
                images={images}
                currentImage={currentImage}
                selectImageFile={selectImageFile}
                setCurrentImage={setCurrentImage}
                removeImage={removeImage}
                updateImages={updateImages}
                onNext={() => {
                  setStep('게시글작성');
                }}
              />
            )}
            {step === '게시글작성' && (
              <AddContent
                feedType="common"
                images={images}
                currentImage={currentImage}
                setCurrentImage={setCurrentImage}
                commonFeedData={commonFeedData}
                updateContents={updateContents}
                updateHashtags={updateHashTags}
                onPrev={() => {
                  setStep('이미지추가');
                }}
                onNext={() => handleOpenPublishPopup()}
              />
            )}
          </div>
        </Modal>
      )}
      {popupState === 'confirm' && (
        <ConfirmPopup
          leftBtnColor="red"
          rightBtnColor="gray"
          mainText="게시물을 삭제하시겠어요?"
          subText="지금 나가면, 수정 내용이 저장되지 않습니다."
          leftBtnText="삭제"
          rightBtnText="취소"
          onAction={handleDeleteFeed}
          onCancel={handleClosePopup}
        />
      )}
      {popupState === 'publish' && (
        <ConfirmPopup
          leftBtnColor="blue"
          rightBtnColor="gray"
          mainText="피드를 게시하시겠습니까?"
          leftBtnText="게시"
          rightBtnText="취소"
          onAction={createCommonFeed}
          onCancel={handleClosePopup}
        />
      )}
    </>
  );
};

export default CommonFeed;
