import React from 'react';
import styles from './Loading.module.scss';

const Loading: React.FC = () => {
  return (
    <div className={styles.loading_wrapper}>
      <div className={styles.loading_text}>LOADING</div>
      <div className={styles.loading_content}></div>
    </div>
  );
};

export default Loading;
