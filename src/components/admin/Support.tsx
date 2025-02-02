/* eslint-disable @next/next/no-img-element */
import React from "react";
import styles from "@/src/styles/admin/Support.module.scss";

const SupportPage: React.FC = () => {
  return (
    <div className={styles.supportPageContainer}>
      <div className={styles.outerBox}>
        <img
          src="/flareye/flareye-tm-sites.png"
          alt="Flareye Şirket Logosu"
          className={styles.logo}
        />
        <h1>Destek Merkezi</h1>
        <p className={styles.infoText}>
          İhtiyacınız olan desteği almak için aşağıdaki seçeneklerden birini
          kullanabilirsiniz.
        </p>
        <div className={styles.supportOptions}>
          <a
            href="mailto:support@yourcompany.com"
            className={styles.supportCard}
          >
            <h3>Email ile Destek</h3>
            <p>Bizimle e-posta yoluyla iletişime geçmek için tıklayın.</p>
          </a>
          <a href="tel:+123456789" className={styles.supportCard}>
            <h3>Telefon ile Destek</h3>
            <p>Çağrı merkezimizi arayarak destek alın.</p>
          </a>
          <a href="/support/tickets" className={styles.supportCard}>
            <h3>Destek Talebi Oluştur</h3>
            <p>Web sitemizin destek sayfasını ziyaret edin.</p>
          </a>
        </div>
      </div>
    </div>
  );
};

export default SupportPage;
