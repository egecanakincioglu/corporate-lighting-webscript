import React from "react";
import styles from "../styles/components/Mission.module.scss";
import { getKeyConditionally } from "../modules/helpers/objects";
import { useUploadData } from "./utils/UploadData";

const MissionArea: React.FC = () => {
  const { texts = {} } = useUploadData();
  const MISSION_TEXT = getKeyConditionally(texts, "mission", "");

  return (
    <section className={styles.missionContainer}>
      <div className={styles.missionContent}>
        <p className={styles.missionText}>{MISSION_TEXT}</p>
      </div>
    </section>
  );
};

export default MissionArea;
