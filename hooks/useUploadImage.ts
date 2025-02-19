import axios from "axios";
import { useState } from "react";

export function useUploadImage(selectedImage: File | null) {
  const [isUploading, setIsUpLoading] = useState<boolean>(false);

  const handleImageUpload = async () => {
    setIsUpLoading(true);
    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

    if (!cloudName || !uploadPreset) {
      throw new Error("Missing cloudinary credentials");
    }

    if (!selectedImage) {
      throw new Error("No image selected");
    }

    try {
      const formData = new FormData();
      formData.append("file", selectedImage);
      formData.append("upload_preset", uploadPreset);

      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        formData
      );
      const imageUrl = response.data.secure_url;
      return imageUrl;
    } catch (error) {
      console.error(error);
      throw new Error("Failed to upload image");
    }
  };

  return { handleImageUpload, isUploading, setIsUpLoading };
}
