"use client";
import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Category } from "@prisma/client";

export function RotateWords({
  text,
  words,
}: {
  text: string;
  words: Category[];
}) {
  const [index, setIndex] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, 3000);
    // Clean up interval on unmount
    return () => clearInterval(interval);
  }, [words.length]);
  return (
    <div className="w-full flex flex-col items-center jusitfy-center mx-auto gap-3 md:gap-5 text-[40px] bg-clip-text leading-[1.2] font-bold tracking-tighter text-black">
      <p className="text-[30px] lg:text-[50px]">{text}</p>
      <AnimatePresence mode="wait">
        <motion.p
          key={words[index].name}
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          transition={{ duration: 0.3 }}
        >
          {words[index].name}
        </motion.p>
      </AnimatePresence>
    </div>
  );
}
