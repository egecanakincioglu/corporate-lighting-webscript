/* eslint-disable react-hooks/exhaustive-deps */
import * as React from "react";
import HTMLFlipBook from "react-pageflip";
import Image from "next/image";
import styles from "../styles/components/PDFBookViewer.module.scss";
import { PDFDocumentProxy } from "pdfjs-dist";
import { useEffect, useRef, useState } from "react";

const DEFAULT_WORKER_SRC = "/pdf.worker.min.js";
const VIEWPORT_SCALE = 1;

interface PDFBookProps {
  pdfUrl: string;
}

type PageData = [number, string];

const PDFBookViewer: React.FC<PDFBookProps> = ({ pdfUrl }) => {
  const [pages, setPages] = useState<PageData[]>([]);
  const pdfRef = useRef<PDFDocumentProxy | null>(null);
  const currentPage = useRef<number>(1);

  const addPages = async (pageEnd: number): Promise<void> => {
    if (!pdfRef.current) return;

    const newPages: PageData[] = [];
    const totalPageCount = pdfRef.current.numPages;
    const finishPage = Math.min(pageEnd, totalPageCount);
    const lastRegisteredPage = +(pages.at(-1)?.at(0) ?? 0);

    if (lastRegisteredPage >= finishPage) return;

    for (
      let currentPageNum = lastRegisteredPage + 1;
      currentPageNum <= finishPage;
      currentPageNum++
    ) {
      if (
        [...pages, ...newPages].some(([pageNum]) => pageNum === currentPageNum)
      )
        continue;

      const page = await pdfRef.current.getPage(currentPageNum);
      const viewport = page.getViewport({ scale: VIEWPORT_SCALE });
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");

      if (!context) continue;

      canvas.height = viewport.height;
      canvas.width = viewport.width;
      await page.render({ canvasContext: context, viewport }).promise;
      const pageDataUrl = canvas.toDataURL();

      newPages.push([currentPageNum, pageDataUrl]);
    }

    setPages((prevPages) => [...prevPages, ...newPages]);
  };

  useEffect(() => {
    const fetchPdf = async () => {
      const pdfjsLib = await import("pdfjs-dist/build/pdf");
      pdfjsLib.GlobalWorkerOptions.workerSrc = DEFAULT_WORKER_SRC;
      const { getDocument } = await import("pdfjs-dist");

      const pdf = await getDocument(pdfUrl).promise;
      pdfRef.current = pdf;

      addPages(pdf.numPages);
    };

    fetchPdf();
  }, []);

  const width = 320;

  return (
    <HTMLFlipBook
      width={width}
      height={width * 1.414}
      minWidth={width}
      size="stretch"
      className={styles.generalSection}
      autoSize={true}
      startPage={currentPage.current}
      mobileScrollSupport={true}
    >
      {pages.map(([pageNum, pageDataUrl]) => (
        <div key={pageNum} className={styles.pageContainer}>
          <Image fill={true} src={pageDataUrl} alt={`Page ${pageNum}`} />
        </div>
      ))}
    </HTMLFlipBook>
  );
};

export default PDFBookViewer;
