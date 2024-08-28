import { FC } from "react";
import { FaFileCsv } from "react-icons/fa";
import { IoMdCloudUpload } from "react-icons/io";

interface FileProps {
  fileName: string | null;
  fileContent: string | null;
}

export const FileZone: FC<FileProps> = ({ fileName, fileContent }) => {
  return (
    <>
      <div className="w-full max-w-lg mx-auto bg-slate-50 rounded-md mt-4 p-2 flex items-center justify-between">
        {fileName ? (
          <>
            <div className="flex items-center gap-2">
              <FaFileCsv className="text-2xl text-blue-800" />
              <span className="text-blue-800 font-bold">{fileName}</span>
            </div>

            <button
              type="button"
              className="px-3 py-1 text-center bg-blue-400 text-slate-50 rounded-md hover:bg-blue-500 transition-all text-sm flex items-center gap-1">
              <span>
                <IoMdCloudUpload />
              </span>
              <span>Convert</span>
            </button>
          </>
        ) : (
          <span className="text-sm text-slate-400">No file added yet</span>
        )}
      </div>
      {fileContent && (
        <div className="mt-4 w-full max-w-lg mx-auto bg-slate-50 rounded-md p-2">
          <h4>File Content</h4>
          <div className="max-h-72 overflow-y-hidden relative">
            <pre className="text-xs mt-4 bg-slate-100 p-2 rounded-md">
              {fileContent}
            </pre>

            <div className="absolute bg-gradient-to-b from-transparent from-20% to-slate-50 w-full h-full top-0 left-0"></div>
          </div>
        </div>
      )}
    </>
  );
};
