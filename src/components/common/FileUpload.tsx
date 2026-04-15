import React, { useState, useEffect } from "react";
import { X, Upload, FileText, Image, File } from "lucide-react";
import { indexedDBService } from "../../services/indexedDB.service";

interface FileUploadProps {
  onUpload: (fileId: string | null) => void;
  accept?: string;
  label?: string;
  existingFileId?: string | null;
  required?: boolean;
  error?: string;
  maxSize?: number;
}

const FileUpload: React.FC<FileUploadProps> = ({
  onUpload,
  accept = "*/*",
  label = "Upload File",
  existingFileId,
  required = false,
  error,
  maxSize = 5,
}) => {
  const [uploading, setUploading] = useState(false);
  const [fileName, setFileName] = useState<string>("");

  useEffect(() => {
    const loadFileName = async () => {
      if (existingFileId) {
        const fileData = await indexedDBService.getFile(existingFileId);
        if (fileData) {
          setFileName(fileData.metadata.name);
        }
      } else {
        setFileName("");
      }
    };
    loadFileName();
  }, [existingFileId]);

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.size > maxSize * 1024 * 1024) {
      alert(`File ${file.name} is too large. Max size is ${maxSize}MB`);
      return;
    }

    setUploading(true);
    setFileName(file.name);
    const newFileId = await indexedDBService.saveFile(file);
    onUpload(newFileId);
    setUploading(false);
  };

  const handleDeleteFile = async () => {
    if (existingFileId) {
      await indexedDBService.deleteFile(existingFileId);
      setFileName("");
      onUpload(null);

      const input = document.getElementById(
        `file-input-${label}`,
      ) as HTMLInputElement;
      if (input) input.value = "";
    }
  };

  const getFileIcon = () => {
    if (accept.includes("image"))
      return <Image className="w-5 h-5 text-blue-500" />;
    if (accept.includes("pdf"))
      return <FileText className="w-5 h-5 text-red-500" />;
    return <File className="w-5 h-5 text-gray-500" />;
  };

  const hasFile = !!existingFileId;

  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      <div className="min-h-30">
        {!hasFile ? (
          <div
            className={`
              relative border-2 border-dashed rounded-md p-4 text-center h-30 flex items-center justify-center
              ${error ? "border-red-500" : "border-gray-300"}
              ${uploading ? "bg-gray-50" : "hover:border-blue-500 transition-colors"}
            `}
          >
            <input
              id={`file-input-${label}`}
              type="file"
              accept={accept}
              onChange={handleFileUpload}
              disabled={uploading}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
            />
            <div className="flex flex-col items-center gap-2">
              {uploading ? (
                <>
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                  <p className="text-sm text-gray-600">Uploading...</p>
                </>
              ) : (
                <>
                  <Upload className="w-8 h-8 text-gray-400" />
                  <p className="text-sm text-gray-600">
                    Click or drag to upload
                  </p>
                  <p className="text-xs text-gray-400">
                    Max file size: {maxSize}MB
                  </p>
                </>
              )}
            </div>
          </div>
        ) : (
          <div className="border border-gray-200 rounded-md p-3 bg-gray-50 h-30 flex items-center">
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-3 flex-1 min-w-0">
                {getFileIcon()}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-700 truncate">
                    {fileName}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">Click to replace</p>
                </div>
              </div>
              <button
                type="button"
                onClick={handleDeleteFile}
                className="p-1 hover:bg-red-100 rounded-full transition-colors shrink-0 ml-2"
                title="Delete file"
              >
                <X className="w-4 h-4 text-red-500" />
              </button>
            </div>
          </div>
        )}
      </div>

      {error && !hasFile && (
        <p className="mt-1 text-sm text-red-500">{error}</p>
      )}
    </div>
  );
};

export default FileUpload;
