'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

import Modal from '@/components/common/Modal';
import useImageUpload from '@/hooks/useImageUpload';
import ConfirmPopup from '@/components/common/Popup/ConfirmPopup/ConfirmPopup';
import {
  useBatchImageUpload,
  useCreateCommonFeed,
  useImageController,
} from '@/api/feed/feedMutations';
import { HttpSuccessType } from '@/api/httpRequest';
import { useGetDetailCommonFeed } from '@/api/feed/feedQueries';

import AddImage from '../AddImage/AddImage';
import AddContent from '../AddContent/AddContent';
import { FeedPopup, CommonFeedStep } from '../../types/feed';
import style from './CommonFeed.module.scss';

const CommonFeed = () => {
  const pathname = useSearchParams();
  const postId = pathname.get('postId');

  const { data: postData } = useGetDetailCommonFeed(postId!, {
    enabled: postId !== null,
  });

  const [step, setStep] = useState<CommonFeedStep>('이미지추가');

  const {
    images,
    currentImage,
    selectImageFile,
    updateCurrentImage,
    removeImage,
    setPostImage,
  } = useImageUpload();

  const [commonFeedData, setCommonFeedData] =
    useState<Feed.BasicPostRequestBody>({
      imageCount: images.length,
      content: '',
      hashTagNames: [],
      contentUrls: [],
    });

  const setPostData = () => {
    if (postId && postData) {
      const basicPostData = postData.result?.post as Feed.BasicPost;

      setCommonFeedData((prev) => ({
        ...prev,
        content: basicPostData?.content,
        hashTagNames: basicPostData?.hashTagNames,
      }));
      setPostImage(basicPostData?.contentImageUrls);
    }
  };

  useEffect(() => {
    setPostData();
  }, []);

  const updateCommonFeedData = (
    nextCommonFeedData: Partial<Feed.BasicPostRequestBody>,
    callback?: () => void,
  ) => {
    setCommonFeedData((prev) => {
      const updatedData = {
        ...prev,
        ...nextCommonFeedData,
      };

      if (callback) {
        callback();
      }

      return updatedData;
    });
  };

  const [popupState, setPopupState] = useState<FeedPopup>(null);

  const handleCloseModal = () => setPopupState('confirm');

  const handleOpenPublishPopup = () => setPopupState('publish');
  const handleClosePopup = () => setPopupState(null);

  // 일반피드 이미지 업로드
  const { mutate: batchImageUploadMutation } = useBatchImageUpload();
  const batchImageUpload = (
    data: HttpSuccessType<Feed.BasicPostResponse>,
    imageFiles: File[],
  ) => {
    if (data.result?.preSignedUrls) {
      const res = batchImageUploadMutation({
        preSignedUrls: data.result?.preSignedUrls,
        images: imageFiles,
      });

      console.log('NCP 이미지 업로드', res);
    }
  };

  const closePopup = () => {
    handleClosePopup();
    window.location.href = '/';
  };

  // 일반 피드 생성
  const { mutate: commonFeedCreateMutation } =
    useCreateCommonFeed(commonFeedData);

  // 일반 피드 수정
  const { mutate: commonFeedUpdateMutation } = useCreateCommonFeed(
    { ...commonFeedData, postId: postId! },
    {
      onSuccess: (data: HttpSuccessType<Feed.BasicPostResponse>) => {
        // 기존 이미지는 제거
        if (images.some((image) => image.file)) {
          const imageFiles = images
            .filter((image) => image.file)
            .map((image) => image.file!);

          batchImageUpload(data, imageFiles);
        }
      },
    },
  );

  const { mutate: imageControllerMutation } = useImageController(
    {
      imageCount: commonFeedData.imageCount,
      fileType: 'POST_IMAGE',
    },
    {
      onSuccess: async (data: HttpSuccessType<Feed.BasicPostResponse>) => {
        updateCommonFeedData(
          { contentUrls: data?.result?.contentUrls },
          commonFeedCreateMutation,
        );

        const imageFile = images
          .map((image) => image.file)
          .filter((file): file is File => file !== undefined);

        if (data.result?.preSignedUrls) {
          batchImageUploadMutation({
            preSignedUrls: data?.result?.preSignedUrls,
            images: imageFile,
            callback: closePopup,
          });
        }
      },
    },
  );

  const createCommonFeed = async () => {
    await imageControllerMutation();
  };

  const updateCommonFeed = () => {
    commonFeedUpdateMutation();
    closePopup();
  };

  const handleDeleteFeed = () => {
    window.location.href = '/';
    handleClosePopup();
  };

  return (
    <>
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
          mainText={`피드를 ${postId ? '수정' : '게시'}하시겠습니까?`}
          leftBtnText={`${postId ? '수정' : '게시'}`}
          rightBtnText="취소"
          onAction={postId ? updateCommonFeed : createCommonFeed}
          onCancel={handleClosePopup}
        />
      )}
    </>
  );
};

export default CommonFeed;
