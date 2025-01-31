import React from "react";

export default function loading() {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center pb-20">
      <div className="w-full h-[600px] bg-gray-200 animate-pulse flex flex-col items-end py-10 sm:py-10 overflow-hidden lg:rounded-xl shadow-2xl"></div>
      <div className="bg-gray-200 h-[500px] animate-pulse overflow-hidden rounded-xl mt-6 flex flex-row gap-10 w-screen max-w-[1280px]"></div>
    </div>
  );
}
