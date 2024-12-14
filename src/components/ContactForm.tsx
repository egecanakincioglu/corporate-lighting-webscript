import styles from "../styles/components/ContactForm.module.scss";
import { faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";
import { faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { getKeyConditionally } from "../modules/helpers/objects";
import { useUploadData } from "./utils/UploadData";
import { parseLinkedInUsername } from "../modules/helpers/strings";
import { RequestResult } from "../@types/database";

const ContactSection: React.FC = () => {
  const { texts = {} } = useUploadData();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [error, setError] = useState("");

  const PHONE_NUMBER = getKeyConditionally(texts.contact, "phone", "");
  const EMAIL = getKeyConditionally(texts.contact, "email", "");
  const LINKEDIN_URL = getKeyConditionally(texts.social, "linkedin", "");
  const LINKEDIN_USERNAME = "@" + (parseLinkedInUsername(LINKEDIN_URL) ?? "");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { name, email, subject, message } = formData;

    const result = await fetch("/api/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, subject, message }),
    });

    const data: RequestResult = await result.json();

    if (!data.status) {
      const { message } = data;
      return setError(message);
    }

    setError("Mesaj başarıyla gönderildi.");
  };

  return (
    <section className={styles.contactSection}>
      <div className={styles.container}>
        <div className={styles.contactInfo}>
          <h3>Projenizi Tartışalım</h3>
          <p>
            Ürün tasarımı girişimleri veya potansiyel iş birlikleri hakkında
            görüşmek için her zaman ulaşabilirsiniz.
          </p>
          <ul>
            <li>
              <FontAwesomeIcon icon={faPhone} className={styles.icon} />
              <a href={`tel:${PHONE_NUMBER}`}>{PHONE_NUMBER}</a>
            </li>
            <li>
              <FontAwesomeIcon icon={faEnvelope} className={styles.icon} />
              <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
            </li>
            <li>
              <FontAwesomeIcon icon={faLinkedin} className={styles.icon} />
              <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer">
                {LINKEDIN_USERNAME}
              </a>
            </li>
          </ul>
        </div>

        <div className={styles.contactForm}>
          <form onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
              <input
                type="text"
                name="name"
                placeholder="Adınız"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className={styles.formGroup}>
              <input
                type="email"
                name="email"
                placeholder="E-posta Adresiniz"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="subject"
                placeholder="Konu"
                value={formData.subject}
                onChange={handleChange}
                required
              />
            </div>
            <div className={styles.formGroup}>
              <textarea
                name="message"
                placeholder="Mesajınız"
                value={formData.message}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit" className={styles.submitButton}>
              Mesaj Gönder
            </button>
            {error && (
              <div>
                <p>{error}</p>
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
