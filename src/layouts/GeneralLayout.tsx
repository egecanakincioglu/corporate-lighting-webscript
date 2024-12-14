import AdminFooter from '../components/admin/Footer';
import AdminNavbar from '@/src/components/admin/AdminNavbar';
import React from 'react';
import styles from '@/src/styles/layouts/GeneralLayout.module.scss';

const GeneralLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div>
      <AdminNavbar />
      <div className={styles.content}>
        {children}
      </div>
      <AdminFooter />
    </div>
  );
};

export default GeneralLayout;