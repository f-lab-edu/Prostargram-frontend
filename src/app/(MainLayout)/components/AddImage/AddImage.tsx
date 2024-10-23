import { FormEvent, SetStateAction } from 'react';
import Plus from '@/assets/icons/plus.svg';
import Button from '@/components/common/Button';
import styles from './AddImage.module.scss';
import ImagePreview from '../ImagePreview/ImagePreview';
import { FeedImage } from '../../@types/commonFeed';

type AddImageProps = {
  onNext?: () => void;
  images: FeedImage[];
  currentImage: FeedImage | null;
  setCurrentImage: React.Dispatch<SetStateAction<FeedImage | null>>;
  selectImageFile: (e: FormEvent<HTMLInputElement>) => void;
};

const AddImage = ({
  onNext,
  images,
  currentImage,
  setCurrentImage,
  selectImageFile,
}: AddImageProps) => {
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
        <div className={styles.add_img_title}>
          이미지 추가<span>(최대 6개)</span>
        </div>
        <div className={styles.image_upload_wrapper}>
          {images && (
            <>
              {images.map((image) => {
                return (
                  <img
                    key={image.name}
                    src={image.src}
                    className={styles.feed_image_preview}
                    alt="feed_image_preview"
                  />
                );
              })}
              {images.length < 6 && (
                <div className={styles.image_upload}>
                  <div className={styles.file_label_wrapper}>
                    <label className={styles.file_label} htmlFor="file-input">
                      <Plus width="32px" height="32px" />
                    </label>
                  </div>
                  <input
                    className={styles.file_input}
                    type="file"
                    id="file-input"
                    onInput={selectImageFile}
                  />
                </div>
              )}
            </>
          )}
        </div>

        <Button
          disabled={images.length === 0}
          className={styles.next_btn}
          onClick={onNext}
        >
          다음 단계로
        </Button>
      </div>
    </>
  );
};

export default AddImage;
