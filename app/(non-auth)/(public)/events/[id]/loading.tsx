import React from "react";

export default function loading() {
  return (
    <div className="w-full">
      <div className="mt-5 relative w-full bg-gray-200 animate-pulse rounded-xl h-[400px]">
        <div className="absolute bottom-2 right-2 w-[130px] h-[140px] bg-gray-300 animate-pulse rounded-xl"></div>
      </div>
      <div className="p-5 px-7  w-full">
        <div className=" flex flex-col xs:flex-row justify-between gap-5">
          <div>
            <div className="mt-5 bg-gray-200 h-5 w-[200px] rounded-lg"></div>
            <div className="my-5 mt-5 bg-gray-200 h-10 w-[200px] rounded-lg"></div>
          </div>

          <div className="flex flex-row xs:flex-col gap-3 justify-start xs:justify-end items-end ">
            <div className="w-[140px] h-[40px] bg-gray-200 animate-pulse rounded-xl"></div>
            <div className="w-[140px] h-[40px] bg-gray-200 animate-pulse rounded-xl"></div>
          </div>
        </div>
        <div className="mt-10 bg-gray-200 h-5 w-full rounded-lg"></div>
        <div className="mt-4 bg-gray-200 h-5 w-full rounded-lg"></div>
        <div className="mt-4 bg-gray-200 h-5 w-full rounded-lg"></div>
        <div className="mt-4 bg-gray-200 h-5 w-full rounded-lg"></div>
        <div className="mt-4 bg-gray-200 h-5 w-full rounded-lg"></div>
      </div>
    </div>
  );
}
