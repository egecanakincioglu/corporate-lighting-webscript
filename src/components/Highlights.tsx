/* eslint-disable @next/next/no-html-link-for-pages */
/* eslint-disable @next/next/no-img-element */
import React from "react";
import styles from "../styles/components/Highlights.module.scss";
import { useUploadData } from "./utils/UploadData";
import { createArray, getKeyConditionally } from "../modules/helpers/objects";
import { replaceUrl, seoTextReplacer } from "../lib/seo";

const Highlights: React.FC = () => {
  const { files = {}, seo, texts } = useUploadData();
  const {
    images: { urlTemplate, alt: altTemplate, count },
    ads: { urlTemplate: adUrlTemplate, alt: adAltTemplate, count: adCount },
  } = seo.component.highlights;

  const ORGANIZATION_NAME = getKeyConditionally(texts, "name", "");

  const PRODUCT_HIGHLIGHTS = createArray(count, (index) => ({
    id: index + 1,
    imgSrc: replaceUrl(urlTemplate, `${index + 1}`),
    title: files.favorites?.titles?.[index] ?? "",
    alt: seoTextReplacer(altTemplate, {
      url: `${index + 1}`,
      name: ORGANIZATION_NAME,
    }),
  }));

  const AD_BANNERS = createArray(adCount, (index) => ({
    id: index + 1,
    imgSrc: replaceUrl(adUrlTemplate, `${index + 1}`),
    alt: seoTextReplacer(adAltTemplate, {
      url: `${index + 1}`,
      name: ORGANIZATION_NAME,
    }),
  }));

  return (
    <div className={styles.highlightsContainer}>
      <div
        className={`${styles.products} grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6`}
      >
        {PRODUCT_HIGHLIGHTS.map((product) => (
          <div key={product.id} className={styles.product}>
            <a href="/contact">
              <img src={product.imgSrc} alt={product.alt} />
              <p className={styles.productTitle}>{product.title}</p>
            </a>
          </div>
        ))}

        {AD_BANNERS.map((ad) => (
          <div key={ad.id} className={styles.adBanner}>
            <img src={ad.imgSrc} alt={ad.alt} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Highlights;
