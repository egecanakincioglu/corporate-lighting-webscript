/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import styles from "@/src/styles/admin/SiteSettings/UpdateWorkingAreas.module.scss";
import { WorkArea } from "@/src/@types/components";
import { RequestResult } from "@/src/@types/database";

const UpdateWorkAreas: React.FC = () => {
  const [areas, setAreas] = useState<WorkArea[]>(
    Array(6).fill({ image: undefined, title: "", description: "", url: "" })
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
      const updatedAreas = [...areas];
      updatedAreas[index] = { ...updatedAreas[index], url, image: file };
      setAreas(updatedAreas);
      setErrorMessage("");
    }
  };

  const handleTitleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const updatedAreas = [...areas];
    updatedAreas[index] = { ...updatedAreas[index], title: e.target.value };
    setAreas(updatedAreas);
  };

  const handleDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
    index: number
  ) => {
    const updatedAreas = [...areas];
    updatedAreas[index] = {
      ...updatedAreas[index],
      description: e.target.value,
    };
    setAreas(updatedAreas);
  };

  const handleRemoveArea = (index: number) => {
    const updatedAreas = [...areas];
    updatedAreas[index] = {
      image: undefined,
      title: "",
      description: "",
      url: "",
      alt: "",
    };
    setAreas(updatedAreas);
    setErrorMessage("");
  };

  const handleClearAll = () => {
    setAreas(
      Array(6).fill({ image: undefined, title: "", description: "", url: "" })
    );
    setErrorMessage("Tüm çalışma alanları temizlendi.");
  };

  const handleUpdate = async () => {
    const incompleteArea = areas.find(
      (area) => !area.image || !area.title || !area.description
    );

    if (incompleteArea) {
      return setErrorMessage(
        "Lütfen tüm fotoğrafları, başlıkları ve açıklamaları doldurun."
      );
    }

    const formData = new FormData();

    for (const { image, description, title } of areas) {
      if (!image || !description || !title) {
        return setErrorMessage(
          "Lütfen tüm fotoğrafları, başlıkları ve açıklamaları doldurun."
        );
      }

      formData.append("files", image);
      formData.append("name", "workingAreas");
      formData.append("title", title);
      formData.append("description", description);
    }

    const result = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    if (!result.ok) {
      const data: RequestResult = await result.json();
      return setErrorMessage(data.message!);
    }

    setErrorMessage("Çalışma alanları başarıyla güncellendi!");
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
    <div className={styles.workAreasContainer}>
      <div className={styles.outerBox}>
        <h1>Çalışma Alanları</h1>
        <p className={styles.infoText}>
          6 adet çalışma alanı için fotoğraf, başlık ve açıklama girin.
        </p>
        {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
        <div className={styles.gridContainer}>
          {areas.map((area, index) => (
            <div
              key={index}
              className={`${styles.gridItem} ${
                index === activeDrag ? styles.drag : ""
              }`}
              onDrop={(e) => {
                e.preventDefault();
                handleImageUpload(e, index);
              }}
              onDragOver={(e) => handleDragOver(e, index)}
              onDragLeave={handleDragLeave}
            >
              {area.image ? (
                <div className={styles.imageContainer}>
                  <img
                    src={area.url}
                    alt={`Work Area ${index + 1}`}
                    className={styles.areaImage}
                  />
                  <FontAwesomeIcon
                    icon={faTimes}
                    className={styles.removeIcon}
                    onClick={() => handleRemoveArea(index)}
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
              <input
                type="text"
                placeholder="Başlık Girin"
                value={area.title}
                onChange={(e) => handleTitleChange(e, index)}
                className={styles.titleInput}
              />
              <textarea
                placeholder="Açıklama Girin"
                value={area.description}
                onChange={(e) => handleDescriptionChange(e, index)}
                className={styles.descriptionInput}
              />
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

export default UpdateWorkAreas;
