import { SetStateAction, useState } from 'react';
import Modal from '@/components/common/Modal';
import useImageUpload from '@/hooks/useImageUpload';
import ConfirmPopup from '@/components/common/Popup/ConfirmPopup/ConfirmPopup';
import style from './CommonFeed.module.scss';
import AddImage from '../AddImage/AddImage';
import AddContent from '../AddContent/AddContent';
import { CommonFeedData, CommonFeedStep } from '../../@types/commonFeed';

type CommonFeedProps = {
  modalStatus: boolean | string;
  setModalStauts: React.Dispatch<SetStateAction<boolean | string>>;
};

const CommonFeed = ({ modalStatus, setModalStauts }: CommonFeedProps) => {
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

  const [publishPopupOn, setPublisgPopupOn] = useState(false);

  const createCommonFeed = () => {
    // TODO: 일반피드 작성 서버 API 연동
    console.log('데이터', data);
    setPublisgPopupOn(false);
    setModalStauts(false);
  };

  const [confirmPopupOn, setConfirmPopupOn] = useState(false);

  const deleteFeedHandler = () => {
    setModalStauts(false);
    setConfirmPopupOn(false);
  };

  const onCancelConfirmPopup = () => {
    setConfirmPopupOn(false);
  };

  const onCancelPublishPopup = () => {
    setPublisgPopupOn(false);
  };
  return (
    <>
      {modalStatus === '일반 피드 작성' && (
        <Modal width="900px" onClose={() => setConfirmPopupOn(true)}>
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
                onNext={() => setPublisgPopupOn(true)}
              />
            )}
          </div>
        </Modal>
      )}
      {confirmPopupOn && (
        <ConfirmPopup
          leftBtnColor="red"
          rightBtnColor="gray"
          mainText="게시물을 삭제하시겠어요?"
          subText="지금 나가면, 수정 내용이 저장되지 않습니다."
          leftBtnText="삭제"
          rightBtnText="취소"
          onAction={deleteFeedHandler}
          onCancel={onCancelConfirmPopup}
        />
      )}
      {publishPopupOn && (
        <ConfirmPopup
          leftBtnColor="blue"
          rightBtnColor="gray"
          mainText="피드를 게시하시겠습니까?"
          leftBtnText="게시"
          rightBtnText="취소"
          onAction={createCommonFeed}
          onCancel={onCancelPublishPopup}
        />
      )}
    </>
  );
};

export default CommonFeed;
