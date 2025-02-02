import React, { useState } from "react";
import styles from "@/src/styles/admin/AdminSettings/UpdatePassword.module.scss";

const UpdatePassword: React.FC = () => {
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [successMessage, setSuccessMessage] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordData({ ...passwordData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const validateForm = () => {
    const newErrors = {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    };

    if (!passwordData.currentPassword) {
      newErrors.currentPassword = "Mevcut şifre gereklidir.";
    }

    if (!passwordData.newPassword) {
      newErrors.newPassword = "Yeni şifre gereklidir.";
    } else if (passwordData.newPassword.length < 6) {
      newErrors.newPassword = "Yeni şifre en az 6 karakter olmalıdır.";
    }

    if (!passwordData.confirmPassword) {
      newErrors.confirmPassword = "Yeni şifre doğrulaması gereklidir.";
    } else if (passwordData.newPassword !== passwordData.confirmPassword) {
      newErrors.confirmPassword = "Şifreler eşleşmiyor.";
    }

    setErrors(newErrors);
    return Object.values(newErrors).every((error) => !error);
  };

  const handleSubmit = async () => {
    if (validateForm()) {
      try {
        const response = await fetch("/api/changePassword", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            currentPassword: passwordData.currentPassword,
            newPassword: passwordData.newPassword,
          }),
        });

        const data = await response.json();

        if (response.ok) {
          setSuccessMessage("Şifre başarıyla güncellendi.");
          setPasswordData({
            currentPassword: "",
            newPassword: "",
            confirmPassword: "",
          });
        } else {
          setErrors({ ...errors, currentPassword: data.message });
          setSuccessMessage("");
        }
      } catch {
        setErrors({ ...errors, currentPassword: "Bir hata oluştu." });
        setSuccessMessage("");
      }
    } else {
      setSuccessMessage("");
    }
  };

  return (
    <div className={styles.passwordContainer}>
      <div className={styles.innerBox}>
        <h1>Şifreyi Güncelle</h1>
        <form className={styles.passwordForm}>
          <div className={styles.inputGroup}>
            <label htmlFor="currentPassword">Mevcut Şifre</label>
            <input
              type="password"
              name="currentPassword"
              placeholder="Mevcut Şifre"
              value={passwordData.currentPassword}
              onChange={handleInputChange}
            />
            {errors.currentPassword && (
              <span className={styles.errorText}>{errors.currentPassword}</span>
            )}
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="newPassword">Yeni Şifre</label>
            <input
              type="password"
              name="newPassword"
              placeholder="Yeni Şifre"
              value={passwordData.newPassword}
              onChange={handleInputChange}
            />
            {errors.newPassword && (
              <span className={styles.errorText}>{errors.newPassword}</span>
            )}
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="confirmPassword">Yeni Şifre Doğrulama</label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Yeni Şifreyi Tekrar Girin"
              value={passwordData.confirmPassword}
              onChange={handleInputChange}
            />
            {errors.confirmPassword && (
              <span className={styles.errorText}>{errors.confirmPassword}</span>
            )}
          </div>

          {successMessage && (
            <span className={styles.successText}>{successMessage}</span>
          )}

          <button
            type="button"
            className={styles.updateButton}
            onClick={handleSubmit}
          >
            Güncelle
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdatePassword;
