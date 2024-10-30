import Image from 'next/image';
import EmptyImage from '@/assets/icons/empty-image.svg';
import LeftArrow from '@/assets/icons/left_arrow.svg';
import RightArrow from '@/assets/icons/right_arrow.svg';
import { FeedImage } from '@/hooks/useImageUpload';
import styles from './ImagePreview.module.scss';

type ImagePreviewProps = {
  images: FeedImage[];
  currentImage: FeedImage;
  updateCurrentImage: (image: FeedImage) => void;
};

const ImagePreview = ({
  images,
  currentImage,
  updateCurrentImage,
}: ImagePreviewProps) => {
  const onClickPrevImage = () => {
    if (currentImage) updateCurrentImage(images[currentImage.index - 1]);
  };

  const onClickNextImage = () => {
    if (currentImage) updateCurrentImage(images[currentImage.index + 1]);
  };

  return (
    <div className={styles.left_content}>
      {images.length === 0 && <EmptyImage />}
      {currentImage && (
        <Image
          key={`feed_image_${currentImage.index}`}
          src={currentImage.src}
          className={styles.feed_image}
          alt="feed_image"
          fill
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
  );
};

export default ImagePreview;
