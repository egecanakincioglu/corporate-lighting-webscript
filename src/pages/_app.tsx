import "../styles/globals.scss";
import { UploadDataProvider } from "../components/utils/UploadData";
import { getSEO } from "../lib/seo";
import Seo from "../components/utils/Seo";

export default function MyApp({
  Component,
  pageProps,
}: {
  Component: React.FC<unknown[]>;
  pageProps: unknown[];
}) {
  const {
    page: { name, description, keywords },
  } = getSEO();

  return (
    <UploadDataProvider>
      <Seo title={name} description={description} keywords={keywords} />

      <Component {...pageProps} />
    </UploadDataProvider>
  );
}
