'use client';

import { CSSProperties, ReactNode } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import Modal from '../Modal';

interface FeedWrapperProps {
  children?: ReactNode;
  modalWidth?: CSSProperties['width'];
  modalMaxWidth?: CSSProperties['maxWidth'];
  modalHeight?: CSSProperties['height'];
  modalMaxHeight?: CSSProperties['maxHeight'];
  feedIdQuery: 'cf' | 'df' | 'sf';
}

const FeedWrapper = ({
  children,
  modalWidth = '90vw',
  modalMaxWidth = '1070px',
  modalHeight = '80vw',
  modalMaxHeight = '800px',
  feedIdQuery,
}: FeedWrapperProps) => {
  const router = useRouter();
  const searchParams = new URLSearchParams(useSearchParams()).get(feedIdQuery);

  const closeFeed = (bool: boolean) => {
    console.log(bool);
    router.push('/');
  };

  if (!searchParams) {
    router.push('/');
    return null;
  }

  return (
    <Modal
      width={modalWidth}
      maxWidth={modalMaxWidth}
      height={modalHeight}
      maxHeight={modalMaxHeight}
      onClose={closeFeed}
    >
      {children}
    </Modal>
  );
};

export default FeedWrapper;
