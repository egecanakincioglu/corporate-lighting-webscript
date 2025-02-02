import React, { useState } from "react";
import styles from "@/src/styles/admin/SiteSettings/UpdateVision.module.scss";
import { RequestResult } from "@/src/@types/database";

const UpdateVision: React.FC = () => {
  const [visionText, setVisionText] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleUpdate = async () => {
    const lastText = visionText.trim();

    if (!lastText) {
      setErrorMessage("Vizyon metni boş olamaz.");
      setSuccessMessage("");
    }

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: JSON.stringify({ textUpload: { vision: lastText } }),
        headers: { "Content-Type": "application/json" },
      });

      if (!res.ok) {
        const data: RequestResult = await res.json();
        return setErrorMessage(
          data.message || "Vizyonu güncellerken bir hata oluştu"
        );
      }

      setErrorMessage("");
      setSuccessMessage("Vizyon başarıyla güncellendi.");
    } catch {
      setErrorMessage("Vizyonu güncellerken bir hata oluştu");
    }
  };

  return (
    <div className={styles.updateVisionContainer}>
      <div className={styles.outerBox}>
        <h1>Vizyon Güncelle</h1>
        <p className={styles.infoText}>
          Vizyon yazısını güncellemek için aşağıdaki metin alanını
          kullanabilirsiniz.
        </p>
        {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
        {successMessage && (
          <p className={styles.successMessage}>{successMessage}</p>
        )}
        <textarea
          placeholder="Vizyon yazısını buraya girin..."
          value={visionText}
          onChange={(e) => setVisionText(e.target.value)}
          className={styles.visionInput}
        />
        <button className={styles.updateButton} onClick={handleUpdate}>
          Güncelle
        </button>
      </div>
    </div>
  );
};

export default UpdateVision;
