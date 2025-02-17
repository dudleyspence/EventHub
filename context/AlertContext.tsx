"use client";

import React, { createContext, useContext, useState } from "react";

interface AlertContextType {
  showAlert: boolean;
  setShowAlert: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  message: React.ReactNode | string;
  setMessage: React.Dispatch<React.SetStateAction<React.ReactNode | string>>;
  color: "success" | "danger";
  setColor: React.Dispatch<React.SetStateAction<"success" | "danger">>;
  icon: React.ReactNode | undefined;
  setIcon: React.Dispatch<React.SetStateAction<React.ReactNode | undefined>>;
}

const AlertContext = createContext<AlertContextType>({
  showAlert: false,
  setShowAlert: () => {},
  title: "",
  setTitle: () => {},
  message: "",
  setMessage: () => {},
  color: "success",
  setColor: () => {},
  icon: undefined,
  setIcon: () => {},
});

export function AlertContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [showAlert, setShowAlert] = useState(false);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState<React.ReactNode | string>("");
  const [color, setColor] = useState<"success" | "danger">("success");
  const [icon, setIcon] = useState<React.ReactNode | undefined>(undefined);

  const value = {
    showAlert,
    setShowAlert,
    message,
    setMessage,
    color,
    title,
    setTitle,
    setColor,
    icon,
    setIcon,
  };

  return (
    <AlertContext.Provider value={value}>{children}</AlertContext.Provider>
  );
}

export function useAlert() {
  return useContext(AlertContext);
}
