/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import styles from "@/src/styles/admin/Services/UpdateServices.module.scss";
import { Service } from "@/src/@types/components";
import { RequestResult } from "@/src/@types/database";

const UpdateServices: React.FC = () => {
  const [activeDrag, setActiveDrag] = useState<number | undefined>(undefined);
  const [services, setServices] = useState<Service[]>(
    Array(4).fill({
      image: undefined,
      url: "",
      title: "",
      description: "",
      detailedDescription: "",
    })
  );
  const [errorMessage, setErrorMessage] = useState("");

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
      const updatedServices = [...services];
      updatedServices[index] = { ...updatedServices[index], image: file, url };
      setServices(updatedServices);
      setErrorMessage("");
    }
  };

  const handleTitleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const updatedServices = [...services];
    updatedServices[index] = {
      ...updatedServices[index],
      title: e.target.value,
    };
    setServices(updatedServices);
  };

  const handleDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
    index: number
  ) => {
    const updatedServices = [...services];
    updatedServices[index] = {
      ...updatedServices[index],
      description: e.target.value,
    };
    setServices(updatedServices);
  };

  const handleDetailedDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
    index: number
  ) => {
    const updatedServices = [...services];
    updatedServices[index] = {
      ...updatedServices[index],
      detailedDescription: e.target.value,
    };
    setServices(updatedServices);
  };

  const handleRemoveService = (index: number) => {
    const updatedServices = [...services];
    updatedServices[index] = {
      image: undefined,
      url: "",
      title: "",
      description: "",
      detailedDescription: "",
      alt: "",
    };
    setServices(updatedServices);
    setErrorMessage("");
  };

  const handleClearAll = () => {
    setServices(
      Array(4).fill({
        image: undefined,
        url: "",
        title: "",
        description: "",
        detailedDescription: "",
      })
    );
    setErrorMessage("Tüm hizmetler temizlendi.");
  };

  const handleUpdate = async () => {
    const incompleteService = services.find(
      (service) =>
        !service.image ||
        !service.title ||
        !service.description ||
        !service.detailedDescription
    );

    if (incompleteService) {
      return setErrorMessage(
        "Lütfen tüm fotoğrafları, başlıkları ve açıklamaları doldurun."
      );
    }

    const formData = new FormData();

    for (const { image, title, description, detailedDescription } of services) {
      if (!image) {
        return setErrorMessage(
          "Lütfen tüm fotoğrafları, başlıkları ve açıklamaları doldurun."
        );
      }

      formData.append("files", image);
      formData.append("name", "services");
      formData.append("title", title);
      formData.append("description", description);
      formData.append("additionalDescription", detailedDescription);
    }

    const result = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    if (!result.ok) {
      const data: RequestResult = await result.json();
      return setErrorMessage(data.message!);
    }

    setErrorMessage("Hizmetler başarıyla güncellendi!");
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
    <div className={styles.servicesContainer}>
      <div className={styles.outerBox}>
        <h1>Hizmetleri Güncelle</h1>
        <p className={styles.infoText}>
          4 adet hizmet için fotoğraf, başlık ve açıklama girin.
        </p>
        {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
        <div className={styles.gridContainer}>
          {services.map((service, index) => (
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
              {service.url ? (
                <div className={styles.imageContainer}>
                  <img
                    src={service.url}
                    alt={`Service ${index + 1}`}
                    className={styles.serviceImage}
                  />
                  <FontAwesomeIcon
                    icon={faTimes}
                    className={styles.removeIcon}
                    onClick={() => handleRemoveService(index)}
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
                value={service.title}
                onChange={(e) => handleTitleChange(e, index)}
                className={styles.titleInput}
              />
              <textarea
                placeholder="Açıklama Girin"
                value={service.description}
                onChange={(e) => handleDescriptionChange(e, index)}
                className={styles.descriptionInput}
              />
              <textarea
                placeholder="Detaylı Açıklama Girin"
                value={service.detailedDescription}
                onChange={(e) => handleDetailedDescriptionChange(e, index)}
                className={styles.detailedDescriptionInput}
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

export default UpdateServices;
