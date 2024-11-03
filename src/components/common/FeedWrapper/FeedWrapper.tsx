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
}

const FeedWrapper = ({
  modalWidth = '90vw',
  modalMaxWidth = '1070px',
  modalHeight = '80vw',
  modalMaxHeight = '800px',
  children,
}: FeedWrapperProps) => {
  const router = useRouter();
  const searchParams = new URLSearchParams(useSearchParams()).get('f');

  const closeFeed = (bool: boolean) => {
    console.log(bool);
    router.push('/');
  };

  if (!searchParams) {
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
