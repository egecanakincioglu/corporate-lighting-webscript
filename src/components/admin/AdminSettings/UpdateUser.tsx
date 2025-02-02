import React, { useState } from "react";
import styles from "@/src/styles/admin/AdminSettings/UpdateUser.module.scss";

const UpdateUser: React.FC = () => {
  const [userData, setUserData] = useState({
    currentEmail: "",
    newEmail: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    currentEmail: "",
    newEmail: "",
    password: "",
  });

  const [successMessage, setSuccessMessage] = useState("");

  // Simule etmek için koydum halledersin
  const mockDatabaseEmails = [
    "allahyok@example.com",
    "muhammedyalan@example.com",
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const validateForm = () => {
    const newErrors = {
      currentEmail: "",
      newEmail: "",
      password: "",
    };

    const lowerCaseEmails = mockDatabaseEmails.map((email) =>
      email.toLowerCase()
    );

    if (!userData.currentEmail) {
      newErrors.currentEmail = "Güncel e-posta adresi gereklidir.";
    } else if (
      !lowerCaseEmails.includes(userData.currentEmail.trim().toLowerCase())
    ) {
      newErrors.currentEmail = "Güncel e-posta adresi yanlış.";
    }

    if (!userData.newEmail) {
      newErrors.newEmail = "Yeni e-posta adresi gereklidir.";
    } else if (!/^\S+@\S+\.\S+$/.test(userData.newEmail.trim())) {
      newErrors.newEmail = "Geçerli bir e-posta adresi giriniz.";
    }

    if (!userData.password) {
      newErrors.password = "Şifre gereklidir.";
    } else if (userData.password.length < 6) {
      newErrors.password = "Şifre en az 6 karakter olmalıdır.";
    }

    setErrors(newErrors);
    return Object.values(newErrors).every((error) => !error);
  };

  const handleSubmit = () => {
    if (validateForm()) {
      setSuccessMessage("Kullanıcı bilgileri başarıyla güncellendi.");
    } else {
      setSuccessMessage("");
    }
  };

  return (
    <div className={styles.userContainer}>
      <div className={styles.innerBox}>
        <h1>Kullanıcı Bilgilerini Güncelle</h1>
        <form className={styles.userForm}>
          <div className={styles.inputGroup}>
            <label htmlFor="currentEmail">Güncel E-Posta Adresi</label>
            <input
              type="text"
              name="currentEmail"
              placeholder="Güncel E-Posta Adresi"
              value={userData.currentEmail}
              onChange={handleInputChange}
            />
            {errors.currentEmail && (
              <span className={styles.errorText}>{errors.currentEmail}</span>
            )}
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="newEmail">Yeni E-Posta Adresi</label>
            <input
              type="text"
              name="newEmail"
              placeholder="Yeni E-Posta Adresi"
              value={userData.newEmail}
              onChange={handleInputChange}
            />
            {errors.newEmail && (
              <span className={styles.errorText}>{errors.newEmail}</span>
            )}
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="password">Şifre</label>
            <input
              type="password"
              name="password"
              placeholder="Şifre"
              value={userData.password}
              onChange={handleInputChange}
            />
            {errors.password && (
              <span className={styles.errorText}>{errors.password}</span>
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

export default UpdateUser;
