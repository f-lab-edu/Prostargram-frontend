import { FormEvent, SetStateAction, useEffect } from 'react';
import Image from 'next/image';
import Plus from '@/assets/icons/plus.svg';
import Remove from '@/assets/icons/remove.svg';
import Button from '@/components/common/Button';
import styles from './AddImage.module.scss';
import ImagePreview from '../ImagePreview/ImagePreview';
import { CommonFeedData, FeedImage } from '../../@types/commonFeed';

type AddImageProps = {
  onNext?: () => void;
  images: FeedImage[];
  currentImage: FeedImage | null;
  setCurrentImage: React.Dispatch<SetStateAction<FeedImage | null>>;
  selectImageFile: (e: FormEvent<HTMLInputElement>) => void;
  removeImage: (idx: number) => void;
  setData: React.Dispatch<SetStateAction<CommonFeedData>>;
};

const AddImage = ({
  onNext,
  images,
  currentImage,
  setCurrentImage,
  selectImageFile,
  removeImage,
  setData,
}: AddImageProps) => {
  useEffect(() => {
    setData((prev) => ({
      ...prev,
      images,
    }));
  }, [images, setData]);

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
              {images.map((image, idx) => {
                return (
                  <div className={styles.image_preview_box}>
                    <Image
                      key={image.name}
                      src={image.src}
                      className={styles.feed_image_preview}
                      width={100}
                      height={100}
                      alt="feed_image_preview"
                    />
                    <Remove
                      className={styles.image_remove}
                      onClick={() => removeImage(idx)}
                    />
                  </div>
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
