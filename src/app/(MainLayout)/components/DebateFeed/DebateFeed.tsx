import Modal from '@/components/common/Modal';
import ConfirmPopup from '@/components/common/Popup/ConfirmPopup/ConfirmPopup';
import { useState } from 'react';
import { useCreateDebateFeed } from '@/api/feed/feedMutations';
import { FeedPopup } from '../../types/feed';
import AddContent from '../AddContent/AddContent';
import styles from './DebateFeed.module.scss';

type DebateFeedProps = {
  modalStatus: boolean | string;
  setModalStatus: (modalStatus: boolean) => void;
};

const DebateFeed = ({ modalStatus, setModalStatus }: DebateFeedProps) => {
  const [popupState, setPopupState] = useState<FeedPopup>(null);

  const handleCloseModal = () => setPopupState('confirm');
  const handleOpenPublishPopup = () => setPopupState('publish');
  const handleClosePopup = () => setPopupState(null);

  const [debateFeedData, setDebateFeedData] =
    useState<Feed.DebatePostRequestBody>({
      content: '',
      hashTagNames: [],
      optionContents: [],
    });

  const { mutate: createDebateMutation } = useCreateDebateFeed(debateFeedData);

  const createDiscussionFeed = () => {
    createDebateMutation();
    handleClosePopup();
    setModalStatus(false);
  };

  const handleDeleteFeed = () => {
    setModalStatus(false);
    handleClosePopup();
  };

  const updateDebateFeedData = (
    nextDebateFeedData: Partial<Feed.DebatePostRequestBody>,
  ) => {
    setDebateFeedData((prev) => ({
      ...prev,
      ...nextDebateFeedData,
    }));
  };

  return (
    <>
      {modalStatus === '토론 피드 작성' && (
        <Modal width="1200px" onClose={handleCloseModal}>
          <div className={styles.content_wrapper}>
            <AddContent
              feedType="discussion"
              updateDebateFeedData={updateDebateFeedData}
              debateFeedData={debateFeedData}
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

export default DebateFeed;
