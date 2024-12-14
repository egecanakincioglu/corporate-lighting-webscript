/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import styles from "@/src/styles/admin/SiteSettings/UpdateFavorites.module.scss";
import { Product } from "@/src/@types/components";
import { RequestResult } from "@/src/@types/database";

const UpdateFavorite: React.FC = () => {
  const [products, setProducts] = useState<Product[]>(
    Array(12).fill({ image: undefined, title: "", url: "" })
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
      const updatedProducts = [...products];
      updatedProducts[index] = { ...updatedProducts[index], image: file, url };
      setProducts(updatedProducts);
      setErrorMessage("");
    }
  };

  const handleNameChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const updatedProducts = [...products];
    updatedProducts[index] = {
      ...updatedProducts[index],
      title: e.target.value,
    };
    setProducts(updatedProducts);
    setErrorMessage("");
  };

  const handleRemoveProduct = (index: number) => {
    const updatedProducts = [...products];
    updatedProducts[index] = { image: undefined, title: "", url: "" };
    setProducts(updatedProducts);
    setErrorMessage("");
  };

  const handleClearAll = () => {
    setProducts(Array(12).fill({ image: undefined, title: "", url: "" }));
    setErrorMessage("Tüm ürünler temizlendi.");
  };

  const handleUpdate = async () => {
    const incompleteProduct = products.find(
      (product) => !product.image || !product.title
    );

    if (incompleteProduct) {
      return setErrorMessage("Lütfen tüm fotoğrafları ve isimleri girin.");
    }

    const formData = new FormData();

    for (const { image, title } of products) {
      if (!image) {
        return setErrorMessage("Lütfen tüm fotoğrafları ve isimleri girin.");
      }

      formData.append("files", image);
      formData.append("title", title);
      formData.append("name", "favorites");
    }

    const result = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    if (!result.ok) {
      const data: RequestResult = await result.json();
      return setErrorMessage(data.message!);
    }

    setErrorMessage("Favori ürünler başarıyla güncellendi!");
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
    <div className={styles.favoriteProductsContainer}>
      <div className={styles.outerBox}>
        <h1>Favori Ürünler</h1>
        <p className={styles.infoText}>
          Yüklemek istediğiniz 12 adet öne çıkan ürünün fotoğrafını sürükleyerek
          veya yükleyerek ekleyin.
        </p>
        {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
        <div className={styles.gridContainer}>
          {products.map((product, index) => (
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
              {product.image ? (
                <div className={styles.imageContainer}>
                  <img
                    src={product.url}
                    alt={`Product ${index + 1}`}
                    className={styles.productImage}
                  />
                  <FontAwesomeIcon
                    icon={faTimes}
                    className={styles.removeIcon}
                    onClick={() => handleRemoveProduct(index)}
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
                placeholder="Ürün İsmi Girin"
                value={product.title}
                onChange={(e) => handleNameChange(e, index)}
                className={styles.productNameInput}
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

export default UpdateFavorite;
