"use client";

import React, { createContext, useContext, useState } from "react";

interface AlertContextType {
  showAlert: boolean;
  setShowAlert: React.Dispatch<React.SetStateAction<boolean>>;
  message: string;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
  color: string;
  setColor: React.Dispatch<React.SetStateAction<string>>;
}

const AlertContext = createContext<AlertContextType>({
  showAlert: false,
  setShowAlert: () => {},
  message: "",
  setMessage: () => {},
  color: "success",
  setColor: () => {},
});

export function AlertContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [showAlert, setShowAlert] = useState(false);
  const [message, setMessage] = useState("");
  const [color, setColor] = useState("success");

  const value = {
    showAlert,
    setShowAlert,
    message,
    setMessage,
    color,
    setColor,
  };

  return (
    <AlertContext.Provider value={value}>{children}</AlertContext.Provider>
  );
}

export function useAlert() {
  return useContext(AlertContext);
}
