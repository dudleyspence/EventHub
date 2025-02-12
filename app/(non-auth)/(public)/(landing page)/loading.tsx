import React from "react";

export default function loading() {
  const placeholderArray = Array.from({ length: 9 });

  return (
    <div className="w-full h-full flex flex-col justify-center items-center pb-20 py-10">
      <div className="w-full h-[520px] bg-gray-200 animate-pulse flex flex-col items-end my-20 sm:my-10 overflow-hidden lg:rounded-xl shadow-2xl"></div>

      <div className="bg-gray-50 h-[500px] animate-pulse overflow-hidden rounded-xl mt-6 flex flex-row items-center justify-center gap-10 w-screen max-w-[1280px]">
        {placeholderArray.map((_, index) => (
          <div key={index} className="min-w-[300px] h-[400px] p-4  bg-white">
            <div className="flex-col gap-4 items-start h-1/3">
              <h3 className="font-bold text-large bg-gray-200 w-1/2 h-4 animate-pulse rounded"></h3>
              <p className="bg-gray-200 w-1/3 h-3 animate-pulse rounded"></p>
              <div className="flex flex-row items-center gap-3">
                <div className="bg-gray-200 w-16 h-5 animate-pulse rounded"></div>
                <small className="bg-gray-200 w-12 h-3 animate-pulse rounded"></small>
              </div>
            </div>
            <div className="overflow-visible w-full h-2/3 relative">
              <div className="bg-gray-200 w-full h-full animate-pulse rounded-xl"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
