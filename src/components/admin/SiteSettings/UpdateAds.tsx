/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import styles from "@/src/styles/admin/SiteSettings/UpdateAds.module.scss";
import { AdBanner } from "@/src/@types/components";
import { RequestResult } from "@/src/@types/database";

const UpdateAdBanners: React.FC = () => {
  const [banners, setBanners] = useState<AdBanner[]>(
    Array(3).fill({ image: undefined, url: "" })
  );
  const [errorMessage, setErrorMessage] = useState("");
  const [activeDrag, setActiveDrag] = useState<number | undefined>(undefined);

  const handleImageUpload = (
    e: React.ChangeEvent<HTMLInputElement> | React.DragEvent<HTMLDivElement>,
    index: number
  ) => {
    e.preventDefault();
    setActiveDrag(undefined);
    const file =
      "dataTransfer" in e
        ? e.dataTransfer.files?.[0]
        : (e.target as HTMLInputElement).files?.[0];

    if (file) {
      const url = URL.createObjectURL(file);
      const updatedBanners = [...banners];
      updatedBanners[index] = { image: file, url };
      setBanners(updatedBanners);
      setErrorMessage("");
    }
  };

  const handleRemoveBanner = (index: number) => {
    const updatedBanners = [...banners];
    updatedBanners[index] = { url: "", image: undefined };
    setBanners(updatedBanners);
    setErrorMessage("");
  };

  const handleClearAll = () => {
    setBanners(Array(3).fill({ image: undefined, url: "" }));
    setErrorMessage("Tüm reklam panoları temizlendi.");
  };

  const handleUpdate = async () => {
    const incompleteBanner = banners.find((banner) => !banner.image);

    if (incompleteBanner) {
      return setErrorMessage("Lütfen tüm reklam panolarına fotoğraf yükleyin.");
    }

    const formData = new FormData();

    for (const { image } of banners) {
      if (!image) {
        return setErrorMessage("Lütfen tüm fotoğrafları ve isimleri girin.");
      }

      formData.append("files", image);
      formData.append("name", "ads");
    }

    const result = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    if (!result.ok) {
      const data: RequestResult = await result.json();
      return setErrorMessage(data.message!);
    }

    setErrorMessage("Reklam panoları başarıyla güncellendi!");
  };

  const handleDragOver = (
    e: React.DragEvent<HTMLDivElement>,
    position: number
  ) => {
    e.preventDefault();
    setActiveDrag(position);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setActiveDrag(undefined);
  };

  return (
    <div className={styles.adBannersContainer}>
      <div className={styles.outerBox}>
        <h1>Reklam Panoları</h1>
        <p className={styles.infoText}>
          Yüklemek istediğiniz 3 reklam panosunun fotoğrafını seçin.
        </p>
        {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
        <div className={styles.gridContainer}>
          {banners.map((banner, index) => (
            <div
              key={index}
              className={`${styles.gridItem} ${
                activeDrag === index ? styles.drag : ""
              }`}
              onDrop={(e) => {
                e.preventDefault();
                handleImageUpload(e, index);
              }}
              onDragOver={(e) => handleDragOver(e, index)}
              onDragLeave={handleDragLeave}
            >
              {banner.image ? (
                <div className={styles.imageContainer}>
                  <img
                    src={banner.url}
                    alt={`Banner ${index + 1}`}
                    className={styles.bannerImage}
                  />
                  <FontAwesomeIcon
                    icon={faTimes}
                    className={styles.removeIcon}
                    onClick={() => handleRemoveBanner(index)}
                  />
                </div>
              ) : (
                <label className={styles.uploadPlaceholder}>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e, index)}
                    className={styles.hiddenInput}
                  />
                  Fotoğraf Yükle
                </label>
              )}
            </div>
          ))}
        </div>
        <div className={styles.buttonContainer}>
          <button className={styles.clearButton} onClick={handleClearAll}>
            İçeriği Temizle
          </button>
          <button className={styles.updateButton} onClick={handleUpdate}>
            Güncelle
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateAdBanners;
