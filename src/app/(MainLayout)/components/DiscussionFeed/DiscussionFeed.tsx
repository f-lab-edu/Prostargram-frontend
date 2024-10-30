import Modal from '@/components/common/Modal';
import ConfirmPopup from '@/components/common/Popup/ConfirmPopup/ConfirmPopup';
import React, { SetStateAction, useState } from 'react';
import { DiscussionFeedData, FeedPopup } from '../../types/feed';
import styles from './DiscussionFeed.module.scss';
import AddContent from '../AddContent/AddContent';

type DiscussionFeedProps = {
  modalStatus: boolean | string;
  setModalStatus: React.Dispatch<SetStateAction<boolean | string>>;
};

const DiscussionFeed = ({
  modalStatus,
  setModalStatus,
}: DiscussionFeedProps) => {
  const [popupState, setPopupState] = useState<FeedPopup>(null);

  const handleCloseModal = () => setPopupState('confirm');
  const handleOpenPublishPopup = () => setPopupState('publish');
  const handleClosePopup = () => setPopupState(null);

  const [discussionFeedData, setDiscussionFeedData] =
    useState<DiscussionFeedData>({
      subject1: '',
      subject2: '',
      content: '',
      hashtag: [],
    });

  const createDiscussionFeed = () => {
    // TODO: 토론피드 작성 서버 API 연동
    console.log('데이터', discussionFeedData);
    handleClosePopup();
    setModalStatus(false);
  };

  const handleDeleteFeed = () => {
    setModalStatus(false);
    handleClosePopup();
  };

  const updateDiscussionFeedData = (
    nextDiscussionFeedData: Partial<DiscussionFeedData>,
  ) => {
    setDiscussionFeedData((prev) => ({
      ...prev,
      ...nextDiscussionFeedData,
    }));
  };

  return (
    <>
      {modalStatus === '토론 피드 작성' && (
        <Modal width="1200px" onClose={handleCloseModal}>
          <div className={styles.content_wrapper}>
            <AddContent
              feedType="discussion"
              updateDiscussionFeedData={updateDiscussionFeedData}
              discussionFeedData={discussionFeedData}
              onNext={() => handleOpenPublishPopup()}
            />
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
          onAction={createDiscussionFeed}
          onCancel={handleClosePopup}
        />
      )}
    </>
  );
};

export default DiscussionFeed;
