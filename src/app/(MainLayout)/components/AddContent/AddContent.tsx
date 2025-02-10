import { ChangeEvent, useEffect, useState } from 'react';
import Image from 'next/image';
import Button from '@/components/common/Button';
import Typo from '@/components/common/Typo';
import CircleCloseIcon from '@/assets/icons/circle-close-gray.svg';
import MyInterestFieldForMyPage from '@/app/profile/components/MyInterest/MyInterestFieldForMyPage';
import If from '@/components/common/If';
import Textarea from '@/components/common/Textarea/Textarea';
import { FeedImage } from '@/hooks/useImageUpload';
import { DiscussionFeedData } from '../../types/feed';
import ImagePreview from '../ImagePreview/ImagePreview';
import styles from './AddContent.module.scss';
import DiscussionSubject from '../DiscussionSubject/DiscussionSubject';

type AddContentProps = {
  feedType: 'common' | 'discussion';
  onPrev?: () => void;
  onNext?: () => void;
  images?: FeedImage[];
  currentImage?: FeedImage | null;
  updateCurrentImage?: (image: FeedImage) => void;
  commonFeedData?: Feed.BasicPostRequestBody;
  discussionFeedData?: DiscussionFeedData;
  updateCommonFeedData?: (
    nextCommonFeedData: Partial<Feed.BasicPostRequestBody>,
  ) => void;
  updateDiscussionFeedData?: (
    nextDiscussionFeedData: Partial<DiscussionFeedData>,
  ) => void;
};

const AddContent = ({
  feedType,
  onPrev,
  onNext,
  images,
  currentImage,
  updateCurrentImage,
  discussionFeedData,
  commonFeedData,
  updateCommonFeedData,
  updateDiscussionFeedData,
}: AddContentProps) => {
  const [hashtags, setHashtags] = useState<string[]>(
    commonFeedData?.hashTagNames ?? [],
  );

  const removeInterest = (index: number) => {
    setHashtags((prev) => prev.filter((_, i) => i !== index));
  };

  const addInterest = (interest: string) => {
    setHashtags((prev) => [...prev, interest]);
  };

  useEffect(() => {
    if (feedType === 'common') {
      updateCommonFeedData?.({ hashTagNames: hashtags });
    } else {
      updateDiscussionFeedData?.({ hashtag: hashtags });
    }
  }, [hashtags]);

  const onChangeTextarea = (e: ChangeEvent<HTMLTextAreaElement>) => {
    if (feedType === 'common') {
      updateCommonFeedData?.({ content: e.target.value });
    } else {
      updateDiscussionFeedData?.({ content: e.target.value });
    }
  };

  return (
    <>
      {/* 좌측 영역 */}
      {feedType === 'common' && images && updateCurrentImage && (
        <ImagePreview
          images={images}
          currentImage={currentImage!}
          updateCurrentImage={updateCurrentImage}
        />
      )}
      {feedType === 'discussion' && (
        <DiscussionSubject
          updateSubject1={(value: string) =>
            updateDiscussionFeedData?.({ subject1: value })
          }
          updateSubject2={(value: string) =>
            updateDiscussionFeedData?.({ subject2: value })
          }
        />
      )}

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
          <Textarea
            value={
              feedType === 'common'
                ? commonFeedData?.content
                : discussionFeedData?.content
            }
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

          <div className={styles.flex_box}>
            {feedType === 'common' && (
              <Button className={styles.prev_btn} fill="gray" onClick={onPrev}>
                이전 단계로
              </Button>
            )}
            <Button
              disabled={
                feedType === 'common'
                  ? commonFeedData?.content.length === 0
                  : discussionFeedData?.content.length === 0 ||
                    discussionFeedData?.subject1.length === 0 ||
                    discussionFeedData?.subject2.length === 0
              }
              className={styles.next_btn}
              onClick={onNext}
            >
              게시
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddContent;
