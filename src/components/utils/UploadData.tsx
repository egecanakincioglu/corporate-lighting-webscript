import React, { createContext, useState, useEffect, useContext } from "react";
import { APIUploadsData } from "../../@types/database";
import { UploadDataProviderProps } from "../../@types/components";
import LoadingPage from "../LoadingPage";

const UploadDataContext = createContext<APIUploadsData | undefined>(undefined);

export const UploadDataProvider: React.FC<UploadDataProviderProps> = ({
  children,
}) => {
  const [uploadData, setUploadData] = useState<APIUploadsData | undefined>(
    undefined
  );

  useEffect(() => {
    const fetchUploadData = async () => {
      try {
        const response = await fetch("/api/upload");
        const data = await response.json();
        setUploadData(data.data);
      } catch (error) {
        console.error("Failed to fetch upload data:", error);
      }
    };

    fetchUploadData();
  }, []);

  if (!uploadData) {
    return <LoadingPage />;
  }

  return (
    <UploadDataContext.Provider value={uploadData}>
      {children}
    </UploadDataContext.Provider>
  );
};

export const useUploadData = () => {
  const context = useContext(UploadDataContext);
  if (context === undefined) {
    throw new Error("useUploadData must be used within a UploadDataProvider");
  }
  return context;
};
