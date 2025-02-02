import React, { useState } from "react";
import styles from "@/src/styles/admin/CorporateSettings/UpdateContact.module.scss";
import { RequestResult } from "@/src/@types/database";
import { emailVerification, phoneVerification } from "@/src/lib/verifications";

const UpdateContact: React.FC = () => {
  const [contactInfo, setContactInfo] = useState({
    phone: "",
    email: "",
    address: "",
  });
  const [errors, setErrors] = useState({
    phone: "",
    email: "",
    address: "",
    others: "",
  });
  const [successMessage, setSuccessMessage] = useState("");

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setContactInfo({ ...contactInfo, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const validateForm = () => {
    const newErrors = {
      phone: "",
      email: "",
      address: "",
      others: "",
    };

    if (!contactInfo.phone) newErrors.phone = "Telefon numarası gereklidir.";
    else if (!phoneVerification(contactInfo.phone))
      newErrors.phone = "Geçerli bir telefon numarası giriniz.";

    if (!contactInfo.email) newErrors.email = "E-posta adresi gereklidir.";
    else if (!emailVerification(contactInfo.email))
      newErrors.email = "Geçerli bir e-posta adresi giriniz.";

    if (!contactInfo.address) newErrors.address = "Şirket adresi gereklidir.";

    setErrors(newErrors);
    return Object.values(newErrors).every((error) => !error);
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return setSuccessMessage("");
    }

    const newErrors = {
      phone: "",
      email: "",
      address: "",
      others: "",
    };

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: JSON.stringify({ textUpload: { contact: contactInfo } }),
        headers: { "Content-Type": "application/json" },
      });

      if (!res.ok) {
        const data: RequestResult = await res.json();
        newErrors.others =
          data.message || "İletişim bilgilerini güncellerken bir hata oluştu";
        return setErrors(newErrors);
      }

      setSuccessMessage("İletişim bilgileri başarıyla güncellendi.");
    } catch {
      newErrors.others = "İletişim bilgilerini güncellerken bir hata oluştu";
      setErrors(newErrors);
    }

    setSuccessMessage("İletişim bilgileri başarıyla güncellendi.");
  };

  return (
    <div className={styles.contactContainer}>
      <div className={styles.innerBox}>
        <div className={styles.headerContainer}>
          <h1>İletişim Bilgilerini Güncelle</h1>
        </div>
        <form className={styles.contactForm}>
          <div className={styles.inputGroup}>
            <label htmlFor="phone">Telefon Numarası</label>
            <input
              type="text"
              id="phone"
              name="phone"
              placeholder="Telefon Numarası"
              value={contactInfo.phone}
              onChange={handleInputChange}
            />
            {errors.phone && (
              <span className={styles.errorText}>{errors.phone}</span>
            )}
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="email">E-posta Adresi</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="E-posta Adresi"
              value={contactInfo.email}
              onChange={handleInputChange}
            />
            {errors.email && (
              <span className={styles.errorText}>{errors.email}</span>
            )}
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="address">Şirket Adresi</label>
            <textarea
              id="address"
              name="address"
              placeholder="Şirket Adresi"
              value={contactInfo.address}
              onChange={handleInputChange}
            />
            {errors.address && (
              <span className={styles.errorText}>{errors.address}</span>
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
          {errors.others && (
            <span className={styles.errorText}>{errors.others}</span>
          )}
        </form>
      </div>
    </div>
  );
};

export default UpdateContact;
