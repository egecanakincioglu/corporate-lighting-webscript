import React, { useState } from "react";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "@/src/styles/admin/SiteSettings/UpdateBanners.module.scss";
import { Photo, Photos } from "@/src/@types/components";
import { RequestResult } from "@/src/@types/database";

const UpdateBanners: React.FC = () => {
  const [photos, setPhotos] = useState<Photos>({
    left: [""],
    topCenter: [""],
    bottomCenter: [""],
    right: [""],
  });

  const [activeDrag, setActiveDrag] = useState<keyof Photos | undefined>(
    undefined
  );

  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handlePhotoUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    position: keyof Photos
  ) => {
    const file = e.target.files?.[0];
    console.log("dosya", file);
    if (file) {
      const url = URL.createObjectURL(file);
      console.log("dosya url", url);
      setPhotos((prev) => ({
        ...prev,
        [position]: [url, file] satisfies Photo,
      }));
      setError("");
      setSuccessMessage("");
    }
  };

  const handleDrop = (
    e: React.DragEvent<HTMLDivElement>,
    position: keyof Photos
  ) => {
    e.preventDefault();
    setActiveDrag(undefined);
    const file = e.dataTransfer.files?.[0];

    if (file) {
      const url = URL.createObjectURL(file);
      setPhotos((prev) => ({
        ...prev,
        [position]: [url, file] satisfies Photo,
      }));
      setError("");
      setSuccessMessage("");
      return;
    }

    setError("Dosya algılanmadı.");
  };

  const handleDragOver = (
    e: React.DragEvent<HTMLDivElement>,
    position: keyof Photos
  ) => {
    e.preventDefault();
    setActiveDrag(position);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setActiveDrag(undefined);
  };

  const handleRemovePhoto = (position: keyof Photos) => {
    setPhotos((prev) => ({ ...prev, [position]: "" }));
    setSuccessMessage("");
  };

  const handleClearPhotos = () => {
    setPhotos({ left: [""], topCenter: [""], bottomCenter: [""], right: [""] });
    setError("");
    setSuccessMessage("Tüm fotoğraflar temizlendi.");
  };

  const handleUpdate = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (
      !photos.left ||
      !photos.topCenter ||
      !photos.bottomCenter ||
      !photos.right
    ) {
      setError("Lütfen tüm alanlara fotoğraf yükleyin.");
      setSuccessMessage("");
      return;
    }

    const photoArray = [
      photos.left,
      photos.topCenter,
      photos.bottomCenter,
      photos.right,
    ];
    const formData = new FormData();

    for (const [, file] of photoArray) {
      if (!file) {
        setError("Lütfen tüm fotoğrafları ve isimleri girin.");
        return;
      }

      formData.append("files", file);
      formData.append("name", "banner");
    }

    try {
      const result = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!result?.ok) {
        const data: RequestResult = await result.json();
        setError(data.message!);
      } else {
        setError("");
        setSuccessMessage("Fotoğraflar başarıyla güncellendi!");
      }
    } catch {
      setSuccessMessage("");
      setError("Bir hata gerçekleşti.");
    }
  };

  return (
    <div className={styles.updateBannersContainer}>
      <div className={styles.innerBox}>
        <h1>Banner Güncelleme</h1>
        <p className={styles.infoText}>
          Banner sistemine eklemek istediğiniz fotoğrafları kutulara sürükleyin
          ya da yükleyin.
        </p>
        {error && <p className={styles.errorText}>{error}</p>}
        {successMessage && (
          <p className={styles.successText}>{successMessage}</p>
        )}
        <div className={styles.photoGridContainer}>
          {["left", "topCenter", "bottomCenter", "right"].map((position) => (
            <div
              key={position}
              className={`${styles.gridItem} ${
                styles[position as keyof Photos]
              } ${activeDrag === position ? styles.drag : ""}`}
              style={{
                backgroundImage: `url(${photos[position as keyof Photos][0]})`,
              }}
              onDrop={(e) => handleDrop(e, position as keyof Photos)}
              onDragOver={(e) => handleDragOver(e, position as keyof Photos)}
              onDragLeave={handleDragLeave}
            >
              {photos[position as keyof Photos][0] && (
                <FontAwesomeIcon
                  icon={faTimes}
                  className={styles.removeIcon}
                  onClick={() => handleRemovePhoto(position as keyof Photos)}
                />
              )}
              {!photos[position as keyof Photos][0] && (
                <div className={styles.uploadPlaceholder}>Fotoğraf yükle</div>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handlePhotoUpload(e, position as keyof Photos)}
                className={styles.hiddenInput}
              />
            </div>
          ))}
        </div>
        <div className={styles.buttonContainer}>
          <button
            className={styles.clearButton}
            onClick={handleClearPhotos}
            type="button"
          >
            Fotoğrafları Temizle
          </button>
          <button
            className={styles.updateButton}
            onClick={handleUpdate}
            type="button"
          >
            Güncelle
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateBanners;
