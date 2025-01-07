import Image from 'next/image';
import Slide from '../Slide';
import styles from './BasicFeedContent.module.scss';

type BasicFeedContentProps = {
  images: string[];
  feedIndex: number;
};

const BasicFeedContent = ({ images, feedIndex }: BasicFeedContentProps) => {
  return (
    <Slide>
      {images.map((image, idx) => {
        return (
          <div key={`feed_${image}_wrap`} className={styles.image_wrap}>
            <Image
              priority={feedIndex === 0 && idx === 0}
              loading={feedIndex === 0 && idx === 0 ? 'eager' : 'lazy'}
              src={image}
              width={630}
              height={550}
              alt="feed_image"
            />
          </div>
        );
      })}
    </Slide>
  );
};

export default BasicFeedContent;
