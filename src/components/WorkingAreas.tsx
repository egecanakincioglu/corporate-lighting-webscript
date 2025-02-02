/* eslint-disable @next/next/no-img-element */
import React from "react";
import styles from "../styles/components/WorkingAreas.module.scss";
import { motion } from "framer-motion";
import { WorkArea } from "../@types/components";
import { useUploadData } from "./utils/UploadData";
import { createArray } from "../modules/helpers/objects";
import { replaceUrl, seoTextReplacer } from "../lib/seo";

const WorkingAreas: React.FC = () => {
  const { seo, files = {} } = useUploadData();
  const {
    images: { count, urlTemplate, alt },
  } = seo.component.workingAreas;

  const WORK_AREAS: WorkArea[] = createArray(count, (index) => ({
    image: undefined,
    url: replaceUrl(urlTemplate, `${index + 1}`),
    title: files.workingAreas?.titles?.[index] ?? "",
    description: files.workingAreas?.descriptions?.[index] ?? "",
    alt: seoTextReplacer(alt, {
      alt: files.workingAreas?.titles?.[index] ?? "",
    }),
  }));

  return (
    <section className={styles.workAreas}>
      <div className={styles.container}>
        {WORK_AREAS.map((area, index) => (
          <motion.div
            className={styles.card}
            key={index}
            whileHover={{ scale: 1.05, y: -5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className={styles.imageWrapper}>
              <img src={area.url} alt={area.alt} className={styles.image} />
            </div>
            <div className={styles.textWrapper}>
              <h3>{area.title}</h3>
              <p>{area.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default WorkingAreas;
