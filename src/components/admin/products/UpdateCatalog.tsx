/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import styles from "@/src/styles/admin/products/UpdateCatalog.module.scss";
import { RequestResult } from "@/src/@types/database";

const UpdateCatalog: React.FC = () => {
  const [catalog, setCatalog] = useState<File | null>(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleFileUpload = (
    e: React.ChangeEvent<HTMLInputElement> | React.DragEvent<HTMLDivElement>
  ) => {
    const file =
      "dataTransfer" in e
        ? e.dataTransfer.files?.[0]
        : (e.target as HTMLInputElement).files?.[0];

    if (file && file.type === "application/pdf") {
      setCatalog(file);
      setErrorMessage("");
      setSuccessMessage("");
    } else {
      setErrorMessage("Lütfen yalnızca PDF formatında bir dosya yükleyin.");
      setSuccessMessage("");
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleRemoveCatalog = () => {
    setCatalog(null);
    setErrorMessage("");
    setSuccessMessage("Katalog temizlendi.");
  };

  const handleUpdate = async () => {
    if (!catalog) {
      setErrorMessage("Lütfen bir katalog yükleyin.");
      setSuccessMessage("");
      return;
    }

    const formData = new FormData();

    formData.append("files", catalog);
    formData.append("name", "catalog");

    const result = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    if (!result.ok) {
      const data: RequestResult = await result.json();
      return setErrorMessage(data.message!);
    }

    setErrorMessage("");
    setSuccessMessage("Katalog başarıyla güncellendi!");
  };

  return (
    <div className={styles.updateCatalogContainer}>
      <div className={styles.outerBox}>
        <h1>Kataloğu Güncelle</h1>
        <p className={styles.infoText}>
          Kataloğunuzu yüklemek için sürükleyip bırakın veya dosya seçin.
        </p>
        {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
        {successMessage && (
          <p className={styles.successMessage}>{successMessage}</p>
        )}
        <div
          className={styles.uploadArea}
          onDrop={handleFileUpload}
          onDragOver={handleDragOver}
        >
          {catalog ? (
            <div className={styles.filePreview}>
              <div className={styles.previewContainer}>
                <img
                  src="/pdf-placeholder.svg"
                  alt="PDF Preview"
                  className={styles.previewImage}
                />
                <FontAwesomeIcon
                  icon={faTimes}
                  className={styles.removeIcon}
                  onClick={handleRemoveCatalog}
                />
              </div>
              <p>{catalog.name}</p>
            </div>
          ) : (
            <label className={styles.uploadPlaceholder}>
              <input
                type="file"
                accept="application/pdf"
                onChange={(e) => handleFileUpload(e)}
                className={styles.hiddenInput}
              />
              PDF Yükle
            </label>
          )}
        </div>
        <button className={styles.updateButton} onClick={handleUpdate}>
          Kataloğu Güncelle
        </button>
      </div>
    </div>
  );
};

export default UpdateCatalog;
