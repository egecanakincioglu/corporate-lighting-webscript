import React from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import ProductsTitle from "../components/ProductsTitle";
import PDFBookViewer from "../components/PDFBookViewer";
import headingStyles from "../styles/pages/MainPage.module.scss";
import styles from "../styles/pages/MainPage.module.scss";
import { useUploadData } from "../components/utils/UploadData";
import Seo from "../components/utils/Seo";
import { uploadFileSettings } from "@/projectData";

const Products: React.FC = () => {
  const { seo } = useUploadData();

  const { page } = seo;
  const { pages } = page;

  const pdfPathTemplate = uploadFileSettings.catalog?.uploadName;
  const pdfPath = pdfPathTemplate ? `/${pdfPathTemplate}.pdf` : "";

  return (
    <>
      <Seo
        title={pages.products.title}
        description={pages.products.description}
        keywords={pages.products.keywords}
      />

      <div className={styles.container}>
        <Header />
        <div className={headingStyles.generalSection}>
          <ProductsTitle />
          <PDFBookViewer pdfUrl={pdfPath} />
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Products;
