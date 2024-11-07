import Slide from '../Slide';
import styles from './BasicFeedContent.module.scss';

type BasicFeedContentProps = {
  images: string[];
};

const BasicFeedContent = ({ images }: BasicFeedContentProps) => {
  return (
    <Slide>
      {images.map((image) => {
        return (
          <div className={styles.image_wrap}>
            <img src={image} alt="feed_image" />
          </div>
        );
      })}
    </Slide>
  );
};

export default BasicFeedContent;
