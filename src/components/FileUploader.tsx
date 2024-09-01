import { FC, useEffect } from "react";
import { useUploadFile } from "../hooks/useUploadFile";
import { JsonReader } from "./JsonReader";

interface FileUploaderProps {
  file: File | null;
}

export const FileUploader: FC<FileUploaderProps> = ({
  file,
}: FileUploaderProps) => {
  const { loading, response } = useUploadFile({ file });
  // const success ='ii'
  console.log(response);

  useEffect(() => {
    console.log("mounted:: Uploader");
  }, [file]);

  if (loading)
    return (
      <div className="w-full">
        <div className="bg-slate-100/70 h-12 rounded-md mb-2 duration-75"></div>
        <div className="h-72 w-full bg-slate-100/70 rounded-md animate-pulse duration-75"></div>
      </div>
    );

  if (response) return <JsonReader jsonString={response.data} />;
};
