import React, { useState } from "react";
import styles from "@/src/styles/admin/CorporateSettings/UpdateSocial.module.scss";
import { RequestResult } from "@/src/@types/database";
import {
  facebookSiteVerification,
  instagramSiteVerification,
  linkedinSiteVerification,
  twitterSiteVerification,
} from "@/projectData";

const UpdateSocial: React.FC = () => {
  const [socialLinks, setSocialLinks] = useState({
    linkedin: "",
    instagram: "",
    twitter: "",
    facebook: "",
  });

  const [errors, setErrors] = useState({
    linkedin: "",
    instagram: "",
    twitter: "",
    facebook: "",
    others: "",
  });

  const [successMessage, setSuccessMessage] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSocialLinks({ ...socialLinks, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const validateForm = () => {
    const newErrors = {
      linkedin: "",
      instagram: "",
      twitter: "",
      facebook: "",
      others: "",
    };

    const urlPatterns = {
      linkedin: linkedinSiteVerification,
      instagram: instagramSiteVerification,
      twitter: twitterSiteVerification,
      facebook: facebookSiteVerification,
    };

    Object.entries(socialLinks).forEach(([key, value]) => {
      if (!value) {
        newErrors[key as keyof typeof newErrors] = `${
          key.charAt(0).toUpperCase() + key.slice(1)
        } bağlantısı gereklidir.`;
      } else if (!urlPatterns[key as keyof typeof urlPatterns](value)) {
        newErrors[key as keyof typeof newErrors] = `${
          key.charAt(0).toUpperCase() + key.slice(1)
        } için geçerli bir URL giriniz.`;
      }
    });

    setErrors(newErrors);
    return Object.values(newErrors).every((error) => !error);
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return setSuccessMessage("");
    }

    const newErrors = {
      linkedin: "",
      instagram: "",
      twitter: "",
      facebook: "",
      others: "",
    };

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: JSON.stringify({ textUpload: { social: socialLinks } }),
        headers: { "Content-Type": "application/json" },
      });

      if (!res.ok) {
        const data: RequestResult = await res.json();
        newErrors.others =
          data.message ||
          "Sosyal medya hesaplarını güncellerken bir hata oluştu";
        return setErrors(newErrors);
      }

      setSuccessMessage("Sosyal medya hesapları başarıyla güncellendi.");
    } catch {
      newErrors.others =
        "Sosyal medya hesaplarını güncellerken bir hata oluştu";
      setErrors(newErrors);
    }
  };

  return (
    <div className={styles.socialContainer}>
      <div className={styles.innerBox}>
        <h1>Sosyal Medya Hesaplarını Güncelle</h1>
        <p className={styles.infoText}>
          Lütfen yalnızca platforma özgü geçerli URL formatında bağlantılar
          giriniz. Örneğin:
          <span> https://www.linkedin.com/in/username</span>
        </p>
        <form className={styles.socialForm}>
          <div className={styles.inputGroup}>
            <label htmlFor="linkedin">LinkedIn</label>
            <input
              type="text"
              name="linkedin"
              placeholder="LinkedIn Profil Bağlantısı"
              value={socialLinks.linkedin}
              onChange={handleInputChange}
            />
            {errors.linkedin && (
              <span className={styles.errorText}>{errors.linkedin}</span>
            )}
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="instagram">Instagram</label>
            <input
              type="text"
              name="instagram"
              placeholder="Instagram Profil Bağlantısı"
              value={socialLinks.instagram}
              onChange={handleInputChange}
            />
            {errors.instagram && (
              <span className={styles.errorText}>{errors.instagram}</span>
            )}
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="twitter">X (Twitter)</label>
            <input
              type="text"
              name="twitter"
              placeholder="X (Twitter) Profil Bağlantısı"
              value={socialLinks.twitter}
              onChange={handleInputChange}
            />
            {errors.twitter && (
              <span className={styles.errorText}>{errors.twitter}</span>
            )}
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="facebook">Facebook</label>
            <input
              type="text"
              name="facebook"
              placeholder="Facebook Profil Bağlantısı"
              value={socialLinks.facebook}
              onChange={handleInputChange}
            />
            {errors.facebook && (
              <span className={styles.errorText}>{errors.facebook}</span>
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

export default UpdateSocial;
