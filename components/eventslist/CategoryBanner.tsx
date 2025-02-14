import { Category } from "@prisma/client";
import React from "react";
import ServerImage from "../UI/ServerImage";

export default function CategoryBanner({
  fullCategory,
}: {
  fullCategory: Category | undefined;
}) {
  return fullCategory ? (
    <div className="w-full bg-yellow-100 h-[400px] sm:h-[280px] mb-5 flex flex-col-reverse sm:flex-row justify-between rounded-md">
      <div>
        <h1 className="text-left pl-10 pt-5 p-2 sm:p-10  font-bold text-5xl">
          {fullCategory.name}
        </h1>
        <p className="text-left pl-10 mr-5 p-2 font-bold text-lg sm:text-xl mb-5">
          {fullCategory.description}
        </p>
      </div>

      <div className="relative sm:h-[280px] w-full h-[200px] sm:w-2/3 md:w-1/2">
        <ServerImage
          alt={fullCategory.name}
          imageUrl={fullCategory.image}
          isPriority={true}
        />
      </div>
    </div>
  ) : (
    <div className="w-full bg-yellow-100 h-[250px] mb-5">
      <h1 className="w-full text-left p-10 font-bold text-5xl mb-10">
        Browse Events
      </h1>
    </div>
  );
}
