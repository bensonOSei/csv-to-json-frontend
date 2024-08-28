import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { MdOutlineUploadFile } from "react-icons/md";
import { FileZone } from "./FileZone";

export const FileUploadZone = () => {
  const [dragOver, setDragOver] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [fileContent, setFileContent] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);

  const onDrop = (acceptedFiles: File[]) => {
    acceptedFiles.forEach((file: File) => {
      // check file size
      if (file.size > 20_000) return;
      setFile(file);
      setFileName(file.name);
      setDragOver(false);

      const reader = new FileReader();
      reader.readAsText(file, "UTF-8");
      reader.onload = () => {
        setFileContent(reader.result as string);
        console.log(reader.result);
      }
    });
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    onDragEnter: () => setDragOver(true),
    onDragLeave: () => setDragOver(false),
  });

  return (
    <>
      <div className="w-full max-w-lg mx-auto mt-10 p-2 bg-slate-50 rounded-md">
        <form {...getRootProps()}>
          <label
            className="w-full grid place-items-center border border-dashed p-3 py-10 rounded-md hover:border-blue-500/50 hover:bg-blue-300/20 transition-all text-blue-700/50 hover:text-blue-800 cursor-pointer"
            htmlFor="csv">
            <MdOutlineUploadFile className="text-4xl" />
            {dragOver && <span className="text-xs mt-5">Drop file here</span>}
            <p className="mt-4 text-center text-sm">
              Drag and Drop file or{" "}
              <span className="font-bold underline">choose file</span>
            </p>
          </label>
          <input
            {...getInputProps()}
            type="file"
            name="csv"
            id="csv"
            hidden
            accept=".csv"
          />
        </form>
      </div>

      <FileZone fileName={fileName} fileContent={fileContent} />
    </>
  );
};
