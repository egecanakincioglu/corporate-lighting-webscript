import Login from '@/src/components/admin/LoginMenu';
import React from 'react';
import styles from '@/src/styles/pages/MainPage.module.scss';

const HomePage: React.FC = () => {
  return (
    <div className={styles.container}>
        <Login />
        <div className={styles.generalSection}></div>
    </div>
  );
};

export default HomePage;
