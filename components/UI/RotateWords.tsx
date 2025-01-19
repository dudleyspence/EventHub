"use client";
import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";

export function RotateWords({
  text = "Rotate",
  words = ["Word 1", "Word 2", "Word 3"],
}: {
  text: string;
  words: string[];
}) {
  const [index, setIndex] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, 5000);
    // Clean up interval on unmount
    return () => clearInterval(interval);
  }, []);
  return (
    <div className="w-full flex flex-col items-start jusitfy-center mx-auto gap-10 text-left text-[40px] lg:text-[50px] xl:text-[60px] bg-clip-text leading-[1.2] font-bold tracking-tighter text-black">
      <p className="text-[60px] lg:text-[70px] xl:text-[80px]">{text}</p>
      <AnimatePresence mode="wait">
        <motion.p
          key={words[index]}
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          transition={{ duration: 0.5 }}
        >
          {words[index]}
        </motion.p>
      </AnimatePresence>
    </div>
  );
}
