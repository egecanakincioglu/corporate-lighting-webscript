import React from "react";
import Image from "next/image";
import styles from "@/src/styles/components/Loading.module.scss";
import { useUploadData } from "./utils/UploadData";

const LOGO_WIDTH = 150;
const LOGO_HEIGHT = 50;

const Loading: React.FC = () => {
  const { seo } = useUploadData();
  const {
    logo: { path, alt },
  } = seo.component.loading;

  return (
    <div className={styles.loadingContainer}>
      <div className={styles.logo}>
        <Image src={path} alt={alt} width={LOGO_WIDTH} height={LOGO_HEIGHT} />
      </div>
      <div className={styles.progressBarContainer}>
        <div className={styles.progressBar}></div>
      </div>
    </div>
  );
};

export default Loading;
