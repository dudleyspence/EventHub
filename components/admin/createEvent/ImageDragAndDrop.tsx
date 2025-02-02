import { Button } from "@heroui/react";
import Image from "next/image";
import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import { FieldError } from "react-hook-form";

interface DragAndDropUploaderProps {
  setSelectedImage: React.Dispatch<React.SetStateAction<File | null>>;
  isError: FieldError | undefined;
}

export function DragAndDropUploader({
  setSelectedImage,
  isError,
}: DragAndDropUploaderProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    onDrop: (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (file) {
        setPreviewUrl(URL.createObjectURL(file));
        setSelectedImage(file);
      }
    },
  });

  const removeImage = () => {
    setPreviewUrl(null);
    setSelectedImage(null);
  };
  return (
    <div className="h-full w-full">
      {!previewUrl ? (
        <div
          {...getRootProps({
            className: `dropzone flex flex-col justify-center items-center cursor-pointer h-full w-full p-6 text-center border-dashed border-2  rounded-xl ${isError ? "border-red-300" : "border-gray-300"}`,
          })}
        >
          <input {...getInputProps()} />
          <Image
            width={150}
            height={150}
            src="https://www.shutterstock.com/image-vector/upload-document-data-file-cloud-600nw-2297720825.jpg"
            alt="image"
          />
          <p className={isError ? "text-red-500" : "test-black"}>
            Drag and drop an image here, or click to select a file
          </p>
          {isError && <p className="text-red-500">{isError.message}</p>}
        </div>
      ) : (
        <div className="p-2 flex flex-col h-full items-center gap-2 border-dashed border-2 border-gray-300 rounded-xl">
          <div className="relative w-full h-full">
            <Image
              src={previewUrl}
              alt="Preview"
              fill
              className="rounded-md object-cover object-center"
            />
          </div>
          <div className="flex flex-row gap-5">
            <Button size="sm" onPress={removeImage} color="danger">
              Remove Image
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
