'use client';

import { ReactNode } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import Modal from '../Modal';

interface FeedWrapperProps {
  children?: ReactNode;
  modalWidth?: string;
}

const FeedWrapper = ({ modalWidth = '1070px', children }: FeedWrapperProps) => {
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
    <Modal width={modalWidth} onClose={closeFeed}>
      {children}
    </Modal>
  );
};

export default FeedWrapper;
