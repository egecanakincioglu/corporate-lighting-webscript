import React, { useState } from "react";
import styles from "@/src/styles/admin/SiteSettings/UpdateMission.module.scss";
import { RequestResult } from "@/src/@types/database";

const UpdateMission: React.FC = () => {
  const [missionText, setMissionText] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleUpdate = async () => {
    const lastText = missionText.trim();

    if (!lastText) {
      setErrorMessage("Misyon metni boş olamaz.");
      setSuccessMessage("");
    }

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: JSON.stringify({ textUpload: { mission: lastText } }),
        headers: { "Content-Type": "application/json" },
      });

      if (!res.ok) {
        const data: RequestResult = await res.json();
        return setErrorMessage(
          data.message || "Misyonu güncellerken bir hata oluştu"
        );
      }

      setErrorMessage("");
      setSuccessMessage("Misyon başarıyla güncellendi.");
    } catch {
      setErrorMessage("Misyonu güncellerken bir hata oluştu");
    }
  };

  return (
    <div className={styles.updateMissionContainer}>
      <div className={styles.outerBox}>
        <h1>Misyon Güncelle</h1>
        <p className={styles.infoText}>
          Misyon yazısını güncellemek için aşağıdaki metin alanını
          kullanabilirsiniz.
        </p>
        {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
        {successMessage && (
          <p className={styles.successMessage}>{successMessage}</p>
        )}
        <textarea
          placeholder="Misyon yazısını buraya girin..."
          value={missionText}
          onChange={(e) => setMissionText(e.target.value)}
          className={styles.missionInput}
        />
        <button className={styles.updateButton} onClick={handleUpdate}>
          Güncelle
        </button>
      </div>
    </div>
  );
};

export default UpdateMission;
