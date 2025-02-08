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
      className={`object-cover overflow-hidden ${style}`}
      src={imageUrl}
      priority={isPriority}
      fill
      alt={alt}
    />
  );
}
