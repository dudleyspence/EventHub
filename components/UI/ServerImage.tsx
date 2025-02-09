import Image from "next/image";
import React from "react";

interface ServerImageProps {
  imageUrl: string;
  alt: string;
  isPriority: boolean;
  style?: string;
}

export default function ServerImage({
  imageUrl,
  alt,
  isPriority,
  style = "",
}: ServerImageProps) {
  return (
    <Image
      className={`object-cover overflow-hidden transition-opacity duration-700 ease-in-out ${style}`}
      src={imageUrl}
      priority={isPriority}
      fill
      alt={alt}
    />
  );
}
