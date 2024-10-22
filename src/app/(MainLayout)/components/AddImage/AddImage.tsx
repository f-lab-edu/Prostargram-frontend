import { FormEvent, useEffect, useState } from 'react';
import Plus from '@/assets/icons/plus.svg';
import Button from '@/components/common/Button';
import EmptyImage from '@/assets/icons/empty-image.svg';
import LeftArrow from '@/assets/icons/left_arrow.svg';
import RightArrow from '@/assets/icons/right_arrow.svg';
import styles from './AddImage.module.scss';

type AddImageProps = {
  onNext?: () => void;
};

type Image = { name: string; size: number; src: string; index: number };

const AddImage = ({ onNext }: AddImageProps) => {
  const [images, setImages] = useState<Image[]>([]);
  const [currentImage, setCurrentImage] = useState<Image>();

  const selectImageFile = (e: FormEvent<HTMLInputElement>) => {
    const { files } = e.target as HTMLInputElement;

    if (files !== null && files[0]) {
      const reader = new FileReader();

      reader.onloadend = () => {
        const img = {
          index: images.length,
          name: files[0].name,
          size: files[0].size,
          src: reader.result as string,
        };
        setImages((prev) => [...prev, img]);
      };
      reader.readAsDataURL(files[0]); // 파일을 Data URL 형식으로 읽기
    }
  };

  const initCurrentImage = () => {
    if (images.length === 1) {
      setCurrentImage(images[0]);
    }
  };

  useEffect(() => {
    initCurrentImage();
  }, [images, currentImage]);

  const onClickPrevImage = () => {
    if (currentImage) setCurrentImage(images[currentImage.index - 1]);
  };

  const onClickNextImage = () => {
    if (currentImage) setCurrentImage(images[currentImage.index + 1]);
  };

  return (
    <>
      {/* 좌측 영역 */}
      <div className={styles.left_content}>
        {images.length === 0 && <EmptyImage />}
        {currentImage && (
          <img
            key={`feed_image_${currentImage.index}`}
            src={currentImage.src}
            className={styles.feed_image}
            alt="feed_image"
          />
        )}
        {images.length > 1 && (
          <>
            {currentImage && currentImage.index !== 0 && (
              <button
                className={styles.left_button}
                onClick={onClickPrevImage}
                aria-label="prev-image-button"
              >
                <LeftArrow />
              </button>
            )}
            {currentImage && currentImage.index !== images.length - 1 && (
              <button
                className={styles.right_button}
                onClick={onClickNextImage}
                aria-label="next-image-button"
              >
                <RightArrow />
              </button>
            )}
          </>
        )}
      </div>
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
                    onInput={(e) => selectImageFile(e)}
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
