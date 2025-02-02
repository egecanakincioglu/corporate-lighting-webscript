import React, { useState } from "react";
import styles from "@/src/styles/admin/CorporateSettings/UpdateName.module.scss";
import { RequestResult } from "@/src/@types/database";

const UpdateName: React.FC = () => {
  const [companyName, setCompanyName] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleUpdate = async () => {
    const name = companyName.trim();

    if (!companyName.trim()) {
      return setError("Şirket ismi boş bırakılamaz.");
    }

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: JSON.stringify({ textUpload: { name } }),
        headers: { "Content-Type": "application/json" },
      });

      if (!res.ok) {
        const data: RequestResult = await res.json();
        return setError(data.message || "Güncelleme sırasında hata oluştu");
      }

      setError("");
      setSuccessMessage("Şirket ismi başarıyla güncellendi.");
    } catch {
      setError("İsim değiştirme sırasında bir hata oluştu");
    }
  };

  return (
    <div className={styles.updateNameContainer}>
      <div className={styles.innerBox}>
        <h1>Şirket İsmi Güncelle</h1>
        <p>Lütfen şirket ismini giriniz:</p>
        <input
          type="text"
          placeholder="Yeni Şirket İsmi"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
        />
        {error && <span className={styles.errorText}>{error}</span>}
        {successMessage && (
          <span className={styles.successText}>{successMessage}</span>
        )}
        <button onClick={handleUpdate} className={styles.updateButton}>
          Güncelle
        </button>
      </div>
    </div>
  );
};

export default UpdateName;
