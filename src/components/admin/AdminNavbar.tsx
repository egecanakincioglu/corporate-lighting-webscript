/* eslint-disable @next/next/no-html-link-for-pages */
import Image from 'next/image';
import React, { useState } from 'react';
import styles from '@/src/styles/admin/AdminNavbar.module.scss';
import {
  faBars,
  faChevronDown,
  faChevronRight,
  faTimes
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const AdminNavbar: React.FC = () => {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleMenu = (menuName: string) => {
    setOpenMenu((prevState) => (prevState === menuName ? null : menuName));
  };

  const toggleNavbar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <>
      <button onClick={toggleNavbar} className={styles.hamburgerButton}>
        <FontAwesomeIcon icon={isCollapsed ? faBars : faTimes} className={styles.icon} />
      </button>

      <nav className={`${styles.navbar} ${isCollapsed ? styles.collapsed : ''}`}>
        <div className={styles.logoContainer}>
          <a href="/">
            <Image src="/main-logo.webp" alt="Afra Lighting Logo" width={150} height={50} />
          </a>
        </div>
        <ul className={styles.menu}>
          <li><a href="/dashboard/view">İstatistikler</a></li>
          <li onClick={() => toggleMenu('corporateSettings')} className={openMenu === 'corporateSettings' ? styles.active : ''}>
            <span>
              Kurumsal Ayarlar
              <FontAwesomeIcon
                icon={openMenu === 'corporateSettings' ? faChevronDown : faChevronRight}
                className={styles.chevronIcon}
              />
            </span>
            {openMenu === 'corporateSettings' && (
              <ul className={styles.subMenu}>
                <li><a href="/dashboard/corporate/update-logo">Logo Güncelleme</a></li>
                <li><a href="/dashboard/corporate/update-name">İsim Güncelleme</a></li>
                <li><a href="/dashboard/corporate/update-contact">İletişim Bilgileri</a></li>
                <li><a href="/dashboard/corporate/update-social">Sosyal Medya</a></li>
              </ul>
            )}
          </li>
          <li onClick={() => toggleMenu('siteSettings')} className={openMenu === 'siteSettings' ? styles.active : ''}>
            <span>
              Site Ayarları
              <FontAwesomeIcon
                icon={openMenu === 'siteSettings' ? faChevronDown : faChevronRight}
                className={styles.chevronIcon}
              />
            </span>
            {openMenu === 'siteSettings' && (
              <ul className={styles.subMenu}>
                <li><a href="/dashboard/site/update-banners">Banner Güncelleme</a></li>
                <li><a href="/dashboard/site/update-favorites">Favori Ürünler</a></li>
                <li><a href="/dashboard/site/update-ads">Reklam Panoları</a></li>
                <li><a href="/dashboard/site/update-working-areas">Çalışma Alanları</a></li>
                <li><a href="/dashboard/site/update-mission">Misyon</a></li>
                <li><a href="/dashboard/site/update-vision">Vizyon</a></li>
              </ul>
            )}
          </li>
          <li onClick={() => toggleMenu('adminSettings')} className={openMenu === 'adminSettings' ? styles.active : ''}>
            <span>
              Yönetici Ayarları
              <FontAwesomeIcon
                icon={openMenu === 'adminSettings' ? faChevronDown : faChevronRight}
                className={styles.chevronIcon}
              />
            </span>
            {openMenu === 'adminSettings' && (
              <ul className={styles.subMenu}>
                <li><a href="/dashboard/admin/update-user">Kullanıcı Güncelleme</a></li>
                <li><a href="/dashboard/admin/update-password">Şifre Güncelleme</a></li>
              </ul>
            )}
          </li>
          <li onClick={() => toggleMenu('products')} className={openMenu === 'products' ? styles.active : ''}>
            <span>
              Ürünler
              <FontAwesomeIcon
                icon={openMenu === 'products' ? faChevronDown : faChevronRight}
                className={styles.chevronIcon}
              />
            </span>
            {openMenu === 'products' && (
              <ul className={styles.subMenu}>
                <li><a href="/dashboard/products/update-catalog">Katalog Yükleme</a></li>
              </ul>
            )}
          </li>
          <li onClick={() => toggleMenu('services')} className={openMenu === 'services' ? styles.active : ''}>
            <span>
              Hizmetler
              <FontAwesomeIcon
                icon={openMenu === 'services' ? faChevronDown : faChevronRight}
                className={styles.chevronIcon}
              />
            </span>
            {openMenu === 'services' && (
              <ul className={styles.subMenu}>
                <li><a href="/dashboard/services/update-services">Hizmetleri Yönet</a></li>
              </ul>
            )}
          </li>
          <li onClick={() => toggleMenu('integrations')} className={openMenu === 'integrations' ? styles.active : ''}>
            <span>
              Entegrasyonlar
              <FontAwesomeIcon
                icon={openMenu === 'integrations' ? faChevronDown : faChevronRight}
                className={styles.chevronIcon}
              />
            </span>
            {openMenu === 'integrations' && (
              <ul className={styles.subMenu}>
                <li><a href="/dashboard/integrations/google-ads">Google Ads</a></li>
              </ul>
            )}
          </li>
          <li><a href="/dashboard/support">Destek</a></li>
        </ul>
      </nav>
    </>
  );
};

export default AdminNavbar;