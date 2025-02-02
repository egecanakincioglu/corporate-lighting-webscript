/* eslint-disable @next/next/no-img-element */
/* eslint-disable @next/next/no-html-link-for-pages */
import React, { useState } from "react";
import styles from "../styles/components/Header.module.scss";
import {
  faBars,
  faChevronDown,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getKeyConditionally } from "../modules/helpers/objects";
import { useUploadData } from "./utils/UploadData";
import { seoTextReplacer } from "../lib/seo";

const MENU_LINKS = [
  { label: "Anasayfa", href: "/" },
  {
    label: "Kurumsal",
    href: "#",
    subLinks: [
      { label: "Misyonumuz", href: "/mission" },
      { label: "Vizyonumuz", href: "/vision" },
    ],
  },
  { label: "Hizmetler", href: "/services" },
  { label: "Ürünler", href: "/products" },
  { label: "İletişim", href: "/contact" },
];

const Header: React.FC = () => {
  const { texts = {}, seo } = useUploadData();
  const {
    logo: { path, alt },
  } = seo.component.header;

  const ORGANIZATION_NAME = getKeyConditionally(texts, "name", "");
  const LOGO_ALT = seoTextReplacer(alt, {
    name: ORGANIZATION_NAME,
  });
  const LOGO_SRC = path;

  const [isCorporateMenuOpen, setIsCorporateMenuOpen] = useState(false);
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  const [isSideCorporateMenuOpen, setIsSideCorporateMenuOpen] = useState(false);

  const toggleMenu = (
    setter: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    setter((prev) => !prev);
  };

  return (
    <header className={styles.headerContainer}>
      <div className={styles.container}>
        <div className={styles.logoAndNavigation}>
          <div className={styles.logo}>
            <a href="/">
              <img src={LOGO_SRC} alt={LOGO_ALT} />
            </a>
          </div>
          <nav className={styles.navLinks}>
            <ul>
              {MENU_LINKS.map((link, index) => (
                <li
                  key={index}
                  className={link.subLinks ? styles.corporateMenu : ""}
                  onMouseEnter={() =>
                    link.subLinks && setIsCorporateMenuOpen(true)
                  }
                  onMouseLeave={() =>
                    link.subLinks && setIsCorporateMenuOpen(false)
                  }
                  onClick={() =>
                    link.subLinks && toggleMenu(setIsCorporateMenuOpen)
                  }
                >
                  <a href={link.href}>
                    {link.label}
                    {link.subLinks && (
                      <FontAwesomeIcon
                        icon={faChevronDown}
                        className={styles.dropdownIcon}
                      />
                    )}
                  </a>
                  {link.subLinks && isCorporateMenuOpen && (
                    <ul className={styles.subMenu}>
                      {link.subLinks.map((subLink, subIndex) => (
                        <li key={subIndex}>
                          <a href={subLink.href}>{subLink.label}</a>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </nav>
          <div className={styles.iconLinks}>
            <button
              className={styles.menuButton}
              onClick={() => toggleMenu(setIsSideMenuOpen)}
            >
              <FontAwesomeIcon icon={faBars} />
            </button>
          </div>
        </div>
      </div>

      <div
        className={`${styles.sideMenu} ${isSideMenuOpen ? styles.open : ""}`}
      >
        <div className={styles.logo}>
          <img src={LOGO_SRC} alt={LOGO_ALT} />
        </div>
        {MENU_LINKS.map((link, index) => (
          <div key={index}>
            {!link.subLinks ? (
              <a href={link.href}>{link.label}</a>
            ) : (
              <div
                className={`${styles.sideCorporateMenu} ${
                  isSideCorporateMenuOpen ? styles.open : ""
                }`}
              >
                <a onClick={() => toggleMenu(setIsSideCorporateMenuOpen)}>
                  {link.label}
                  <FontAwesomeIcon
                    icon={faChevronDown}
                    className={styles.dropdownIcon}
                  />
                </a>
                {isSideCorporateMenuOpen && (
                  <div className={styles.subMenu}>
                    {link.subLinks.map((subLink, subIndex) => (
                      <a key={subIndex} href={subLink.href}>
                        {subLink.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
        <button
          className={styles.closeButton}
          onClick={() => toggleMenu(setIsSideMenuOpen)}
        >
          <FontAwesomeIcon icon={faTimes} />
        </button>
      </div>
    </header>
  );
};

export default Header;
