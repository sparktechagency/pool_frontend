"use client";

import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import { Upload as UploadIcon } from "lucide-react";
import { serverImageBuilder } from "@/lib/formatter";
// adjust path

interface UploadBoxProps {
  existingIcon?: string; // server path (e.g. "/storage/icon/...png")
  onFileChange?: (file: File | null) => void;
}

export default function UploadBox({
  existingIcon,
  onFileChange,
}: UploadBoxProps) {
  const [preview, setPreview] = useState<string | null>(null);

  // Set preview from server image on load
  useEffect(() => {
    if (existingIcon && !preview) {
      setPreview(serverImageBuilder(existingIcon));
    }
  }, [existingIcon, preview]);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        const file = acceptedFiles[0];
        setPreview(URL.createObjectURL(file));
        onFileChange?.(file);
      }
    },
    [onFileChange]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    accept: { "image/*": [] },
  });

  return (
    <div
      {...getRootProps()}
      className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
        isDragActive
          ? "border-primary bg-primary/10"
          : "border-muted hover:border-primary hover:bg-muted/50"
      }`}
    >
      <input {...getInputProps()} />
      <UploadIcon className="mx-auto mb-2 text-muted-foreground" size={24} />
      <p className="text-sm text-muted-foreground">
        {isDragActive
          ? "Drop the file here..."
          : "Click or drag a file here to upload"}
      </p>

      {preview && (
        <div className="mt-4 flex justify-center">
          <Image
            src={preview}
            alt="Preview"
            width={80}
            height={80}
            className="rounded object-cover border"
          />
        </div>
      )}
    </div>
  );
}
