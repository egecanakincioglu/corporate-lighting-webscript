import React from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import MissionArea from "../components/MissionArea";
import MissionTitle from "../components/MissionTitle";
import styles from "../styles/pages/MainPage.module.scss";
import { useUploadData } from "../components/utils/UploadData";
import Seo from "../components/utils/Seo";

const Mission: React.FC = () => {
  const { seo } = useUploadData();

  const { page } = seo;
  const { pages } = page;

  return (
    <>
      <Seo
        title={pages.mission.title}
        description={pages.mission.description}
        keywords={pages.mission.keywords}
      />

      <div className={styles.container}>
        <Header />
        <div className={styles.generalSection}>
          <MissionTitle />
          <MissionArea />
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Mission;
