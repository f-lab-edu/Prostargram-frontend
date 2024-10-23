import { SetStateAction } from 'react';
import Image from 'next/image';
import Button from '@/components/common/Button';
import Typo from '@/components/common/Typo';
import { FeedImage } from '../../@types/commonFeed';
import ImagePreview from '../ImagePreview/ImagePreview';
import styles from './AddContent.module.scss';

type AddContentProps = {
  onPrev?: () => void;
  onNext?: () => void;
  images: FeedImage[];
  currentImage: FeedImage | null;
  setCurrentImage: React.Dispatch<SetStateAction<FeedImage | null>>;
};

const AddContent = ({
  onPrev,
  onNext,
  images,
  currentImage,
  setCurrentImage,
}: AddContentProps) => {
  return (
    <>
      {/* 좌측 영역 */}
      <ImagePreview
        images={images}
        currentImage={currentImage!}
        setCurrentImage={setCurrentImage}
      />
      {/* 우측 영역 */}
      <div className={styles.right_content}>
        <div className={styles.nickname}>
          <Image
            src="../../../../assets/icons/caution.svg"
            alt=""
            width="32"
            height="32"
          />
          <Typo as="span" color="gray-2" fontSize="body-16">
            seongjin
          </Typo>
        </div>
        <div className={styles.feed_content}>
          <Typo as="p" color="gray-2" fontSize="body-20">
            게시글 작성
          </Typo>
          {/* 컴포넌트화 */}
          <textarea placeholder="문구 작성 ..." maxLength={2000} />
          <Typo as="p" color="gray-2" fontSize="body-20">
            해시태그 작성
            <Typo as="span" color="gray-4" fontSize="body-20">
              (최대 5개)
            </Typo>
          </Typo>
        </div>

        <div>
          <Button className={styles.prev_btn} fill="gray" onClick={onPrev}>
            이전 단계로
          </Button>
          <Button className={styles.next_btn} onClick={onNext}>
            게시
          </Button>
        </div>
      </div>
    </>
  );
};

export default AddContent;
