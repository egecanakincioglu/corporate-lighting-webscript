/* eslint-disable @next/next/no-img-element */
import { RequestResult } from "@/src/@types/database";
import { isNumber } from "@/src/lib/verifications";
import styles from "@/src/styles/admin/CorporateSettings/UpdateLogo.module.scss";
import {
  faCheckCircle,
  faTimes,
  faUpload,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

const LogoUpload: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState<{
    text: string;
    type: "success" | "error";
  } | null>(null);
  const [progress, setProgress] = useState<number | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setMessage(null);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
      setMessage(null);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleUpload = async () => {
    if (!file) {
      return setMessage({
        text: "Lütfen bir dosya seçin veya bırakın",
        type: "error",
      });
    }

    try {
      setProgress(0);

      const formData = new FormData();
      formData.append("files", file);
      formData.append("name", "logo");

      const uploadProgressInterval = setInterval(() => {
        setProgress((prev) => (prev === null ? 0 : Math.min(prev + 10, 99)));
      }, 100);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      clearInterval(uploadProgressInterval);

      if (!res.ok) {
        const data: RequestResult = await res.json();
        setMessage({
          text: data.message || "Yükleme sırasında hata oluştu",
          type: "error",
        });
        setProgress(null);
        return;
      }

      setProgress(100);
      setMessage({ text: "Logo başarıyla yüklendi", type: "success" });
    } catch {
      setMessage({ text: "Yükleme sırasında bir hata oluştu", type: "error" });
      setProgress(null);
    }
  };

  const handleRemoveFile = () => {
    setFile(null);
    setProgress(null);
    setMessage(null);
  };

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Logo Güncelle</h3>
      <div
        className={styles.dropZone}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        {file ? (
          <div className={styles.previewContainer}>
            <div className={styles.preview}>
              <img
                src={URL.createObjectURL(file)}
                alt="Preview"
                className={styles.previewImage}
              />
              <FontAwesomeIcon
                icon={faTimes}
                className={styles.removeIcon}
                onClick={handleRemoveFile}
              />
              {progress === 100 && (
                <FontAwesomeIcon
                  icon={faCheckCircle}
                  className={styles.checkIcon}
                />
              )}
            </div>
            <p className={styles.fileName}>{file.name}</p>
            {progress !== null && (
              <div className={styles.progressBar}>
                <div
                  className={styles.progress}
                  style={{ width: `${progress}%` }}
                />
              </div>
            )}
          </div>
        ) : (
          <>
            <FontAwesomeIcon icon={faUpload} className={styles.icon} />
            <p className={styles.dropText}>
              Dosyanızı buraya sürükleyip bırakın veya{" "}
              <label htmlFor="fileInput" className={styles.browse}>
                göz atın
              </label>
              .
            </p>
          </>
        )}
        <input
          type="file"
          accept=".png,.jpg,.jpeg,.webp"
          onChange={handleFileChange}
          className={styles.fileInput}
          id="fileInput"
        />
      </div>
      <button
        disabled={isNumber(progress)}
        onClick={handleUpload}
        className={styles.uploadButton}
      >
        Yükle
      </button>
      {message && (
        <p
          className={`${
            message.type === "success" ? styles.success : styles.error
          }`}
        >
          {message.text}
        </p>
      )}
    </div>
  );
};

export default LogoUpload;
