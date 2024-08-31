import { useState } from "react";
import { useApi } from "./UseApi";

const CONVERT_API_URL = "http://localhost:3000/api/csv/convert";

interface UseUploadFileProps {
  file: File | null;
}

interface UseUploadFileResult {
  success: boolean;
  loading: boolean;
  error: any;
  refetch: () => void;
  cancelRequest: () => void;
  progress: number;
  response: any;
}

export const useUploadFile = ({ file } : UseUploadFileProps ): UseUploadFileResult => {
  const [success, setSuccess] = useState<boolean>(false);
  const prepFile = () => {
    const formData = new FormData();
    formData.append("csv", file as Blob);
    return formData;
  };

  const { data, loading, error, refetch, cancelRequest, progress } = useApi({
    url: CONVERT_API_URL,
    method: "POST",
    onSuccess: () => setSuccess(true),
    onError: () => setSuccess(false),
    data: prepFile(),
    dependencies: [file],
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return { success, loading, error, refetch, cancelRequest, progress, response: data };
};
