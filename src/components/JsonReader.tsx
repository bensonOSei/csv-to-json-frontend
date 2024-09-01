import { FC, useState } from "react";
import { FaRegCopy } from "react-icons/fa";
import { LuDownload } from "react-icons/lu";
import { TbCopyCheck } from "react-icons/tb";

interface JsonReaderProps {
  jsonString: string;
}

export const JsonReader: FC<JsonReaderProps> = ({ jsonString }) => {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    handleCopied();
  };
  const beautifyJson = (json: string) => {
    const data = JSON.parse(json);
    const formattedJson = JSON.stringify(data, null, 2);
    return formattedJson;
  };
  const [copied, setCopied] = useState<boolean>(false);
  const [downloaded, setDownloaded] = useState<boolean>(false);

  const handleCopied = () => {
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  const handleDownloaded = () => {
    setDownloaded(true);
    setTimeout(() => {
      setDownloaded(false);
    }, 2000);
  };

  const downloadJson = () => {
    handleDownloaded();
  }


  return (
    <div>
      <h4 className="mb-2 text-lg font-bold text-blue-900">Results</h4>
      <div className="h-80 overflow-hidden p-2 rounded-lg text-xs bg-slate-50 relative">
        <pre>{beautifyJson(jsonString)}</pre>
        <div className="absolute bg-gradient-to-b from-transparent from-10% to-slate-50 w-full h-full top-0 left-0 z-10"></div>
      </div>
      <div className="mt-3 flex items-center gap-2 p-1">
        <button
          onClick={() => copyToClipboard(jsonString)}
          disabled={copied}
          className="flex items-center text-xs p-1 px-2 bg-slate-100 rounded-md hover:bg-slate-200/70 transition-all hover:text-blue-800 text-blue-500/30 disabled:bg-green-500 disabled:text-stone-50"
          type="button">
          <span>
            {copied ? "Copied!" : "Copy"}
          </span>
          {copied ? (
            <TbCopyCheck className="ml-1" />
          ) : (
            <FaRegCopy className="ml-1" />
          )}
        </button>
        <button
          onClick={downloadJson}
          disabled={downloaded}
          className="flex items-center text-xs p-1 px-2 bg-slate-100 rounded-md hover:bg-slate-200/70 transition-all hover:text-blue-800 text-blue-500/30"
          type="button">
          <span>
            {downloaded ? "Downloaded!" : "Download"}
          </span>
          <LuDownload className="ml-1" />
        </button>
      </div>
    </div>
  );
};
