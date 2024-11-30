'use client';

import { useState } from 'react';
import Modal from '@/components/common/Modal';
import useImageUpload from '@/hooks/useImageUpload';
import ConfirmPopup from '@/components/common/Popup/ConfirmPopup/ConfirmPopup';
import {
  useBatchImageUpload,
  useCreateCommonFeed,
} from '@/api/feed/feedMutations';
import { HttpSuccessType } from '@/api/httpRequest';
import style from './CommonFeed.module.scss';
import AddImage from '../AddImage/AddImage';
import AddContent from '../AddContent/AddContent';
import { FeedPopup, CommonFeedStep } from '../../types/feed';

type CommonFeedProps = {
  modalStatus: boolean | string;
  setModalStatus: (modalStatus: boolean) => void;
};

const CommonFeed = ({ modalStatus, setModalStatus }: CommonFeedProps) => {
  const [step, setStep] = useState<CommonFeedStep>('이미지추가');
  const {
    images,
    currentImage,
    selectImageFile,
    updateCurrentImage,
    removeImage,
  } = useImageUpload();
  const [commonFeedData, setCommonFeedData] =
    useState<Feed.BasicPostRequestBody>({
      imageCount: images.length,
      content: '',
      hashTagNames: [],
      createdAt: '',
    });

  const updateCommonFeedData = (
    nextCommonFeedData: Partial<Feed.BasicPostRequestBody>,
  ) => {
    setCommonFeedData((prev) => ({
      ...prev,
      ...nextCommonFeedData,
    }));
  };

  const [popupState, setPopupState] = useState<FeedPopup>(null);

  const handleCloseModal = () => setPopupState('confirm');
  const handleOpenPublishPopup = () => setPopupState('publish');
  const handleClosePopup = () => setPopupState(null);

  const { mutate: batchImageUploadMutation } = useBatchImageUpload();
  const { mutate: commonFeedMutation } = useCreateCommonFeed(commonFeedData, {
    onSuccess: (data: HttpSuccessType<Feed.BasicPostResponse>) => {
      const imageFiles = images.map((image) => image.file);

      if (data.result?.preSignedImageUrls) {
        const res = batchImageUploadMutation({
          preSignedImageUrls: data.result?.preSignedImageUrls,
          images: imageFiles,
        });

        console.log('NCP 이미지 업로드', res);
      }
    },
  });

  const createCommonFeed = () => {
    // TODO: 일반피드 작성 서버 API 연동
    console.log('데이터', commonFeedData);
    commonFeedMutation();
    // console.log('게시물 작성 완료!', data);
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
                updateCurrentImage={updateCurrentImage}
                removeImage={removeImage}
                updateImages={updateCommonFeedData}
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
                updateCurrentImage={updateCurrentImage}
                commonFeedData={commonFeedData}
                updateCommonFeedData={updateCommonFeedData}
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
