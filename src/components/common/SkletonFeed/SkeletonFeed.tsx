import styles from './SkeletonFeed.module.scss';

const SkeletonFeed = () => {
  return (
    <div className={styles.container}>
      <header className={styles.top}>
        <div className={styles.profile_img} />
        <div className={styles.name} />
      </header>
      <main className={styles.center} />
      <footer className={styles.bottom}>
        <div className={styles.bottom_top} />
        <div className={styles.bottom_center} />
        <div className={styles.bottom_bottom} />
      </footer>
    </div>
  );
};

export default SkeletonFeed;
