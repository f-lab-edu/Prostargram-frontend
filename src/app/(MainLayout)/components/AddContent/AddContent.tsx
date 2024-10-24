import { ChangeEvent, SetStateAction, useEffect, useState } from 'react';
import Image from 'next/image';
import Button from '@/components/common/Button';
import Typo from '@/components/common/Typo';
import CircleCloseIcon from '@/assets/icons/circle-close-gray.svg';
import MyInterestFieldForMyPage from '@/app/my/components/MyInterest/MyInterestFieldForMyPage';
import If from '@/components/common/If';
import { CommonFeedData, FeedImage } from '../../@types/commonFeed';
import ImagePreview from '../ImagePreview/ImagePreview';
import styles from './AddContent.module.scss';

type AddContentProps = {
  onPrev?: () => void;
  onNext?: () => void;
  images: FeedImage[];
  currentImage: FeedImage | null;
  setCurrentImage: React.Dispatch<SetStateAction<FeedImage | null>>;
  data: CommonFeedData;
  updateContents: (contents: string) => void;
  updateHashtags: (hashtags: string[]) => void;
};

const AddContent = ({
  onPrev,
  onNext,
  images,
  currentImage,
  setCurrentImage,
  data,
  updateContents,
  updateHashtags,
}: AddContentProps) => {
  const [hashtags, setHashtags] = useState<string[]>([]);

  const removeInterest = (index: number) => {
    setHashtags((prev) => prev.filter((_, i) => i !== index));
  };

  const addInterest = (interest: string) => {
    setHashtags((prev) => [...prev, interest]);
  };

  useEffect(() => {
    updateHashtags(hashtags);
  }, [hashtags]);

  const onChangeTextarea = (e: ChangeEvent<HTMLTextAreaElement>) => {
    updateContents(e.target.value);
  };

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
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4vkwPhD-NHO6sV_3ailgWXjiP_WPM24J3IhkB3xZ-bQ&s"
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
          <textarea
            value={data?.content}
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
              onChangeTextarea(e)
            }
            placeholder="문구 작성 ..."
            maxLength={2000}
          />
          <Typo as="p" color="gray-2" fontSize="body-20">
            해시태그 작성
            <Typo as="span" color="gray-4" fontSize="body-20">
              (최대 5개)
            </Typo>
          </Typo>
          <ul className={styles.my_interest_list}>
            {hashtags.map((hashtag, index) => (
              <button
                key={hashtag}
                className={styles.my_interest}
                onClick={() => removeInterest(index)}
              >
                #{hashtag}
                <i>
                  <CircleCloseIcon />
                </i>
              </button>
            ))}
            <If condition={hashtags.length < 5}>
              <If.True>
                <MyInterestFieldForMyPage
                  checkList={hashtags}
                  addInterestHandler={addInterest}
                />
              </If.True>
            </If>
          </ul>
        </div>
        <div>
          <Button className={styles.prev_btn} fill="gray" onClick={onPrev}>
            이전 단계로
          </Button>
          <Button
            disabled={data.content.length === 0}
            className={styles.next_btn}
            onClick={onNext}
          >
            게시
          </Button>
        </div>
      </div>
    </>
  );
};

export default AddContent;
