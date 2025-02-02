/* eslint-disable @next/next/no-img-element */
import globalStyles from "../styles/Globals.module.scss";
import React from "react";
import styles from "../styles/components/Banner.module.scss";
import { useUploadData } from "./utils/UploadData";
import { createArray, getKeyConditionally } from "../modules/helpers/objects";
import { replaceUrl, seoTextReplacer } from "../lib/seo";

const Banner: React.FC = () => {
  const { texts = {}, seo } = useUploadData();
  const {
    images: { urlTemplate, alt: altTemplate, count },
  } = seo.component.banner;
  const ORGANIZATION_NAME = getKeyConditionally(texts, "name", "");

  const BANNERS = createArray(count, (index) => ({
    src: replaceUrl(urlTemplate, `${index + 1}`),
    alt: seoTextReplacer(altTemplate, {
      name: ORGANIZATION_NAME,
      url: `${index + 1}`,
    }),
  }));

  return (
    <div
      className={`${styles.bannerContainer} flex w-full flex-col md:flex-row`}
    >
      <div className={`${styles.mainSquare} ${globalStyles.generalRounded}`}>
        <img src={BANNERS[0].src} alt={BANNERS[0].alt} />
      </div>
      <div className={`${styles.middleBanners} flex-col`}>
        <div className={`${styles.bannerItem} ${globalStyles.generalRounded}`}>
          <img src={BANNERS[1].src} alt={BANNERS[1].alt} />
        </div>
        <div className={`${styles.bannerItem} ${globalStyles.generalRounded}`}>
          <img src={BANNERS[2].src} alt={BANNERS[2].alt} />
        </div>
      </div>
      <div className={`${styles.sideRectangle} ${globalStyles.generalRounded}`}>
        <img src={BANNERS[3].src} alt={BANNERS[3].alt} />
      </div>
    </div>
  );
};

export default Banner;
