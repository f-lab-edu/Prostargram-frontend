'use client';

import Mypage from '../components/Mypage';

import styles from './page.module.scss';

interface OthersMyPageProps {
  params: {
    slug: string;
  };
}

const OthersMyPage = ({ params }: OthersMyPageProps) => {
  const { slug } = params;

  return (
    <div className={styles.container}>
      <Mypage userId={+slug} slug={slug} />
    </div>
  );
};

export default OthersMyPage;
