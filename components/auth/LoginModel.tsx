"use client";
import React from "react";
import { Modal, ModalContent, ModalHeader, ModalBody } from "@nextui-org/react";
import { useLoginModal } from "@/context/LoginModelProvider";
import Image from "next/image";
import logo from "@/public/brand/Logo.png";
import Link from "next/link";

export default function LoginModal() {
  const { isOpen, closeLoginModal } = useLoginModal();

  return (
    <Modal isOpen={isOpen} onOpenChange={(open) => !open && closeLoginModal()}>
      <ModalContent>
        {() => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              <Image height={50} src={logo} alt="brand logo" />
            </ModalHeader>
            <ModalBody className="pb-10">
              <p className="text-lg font-semibold">Welcome to EventHub</p>

              <Link href="/signin" onClick={closeLoginModal}>
                <div className="w-full flex justify-center items-center h-[70px] shadow-xl rounded-xl bg-orange-100 my-5">
                  <h1 className="font-bold text-2xl">Sign In</h1>
                </div>
              </Link>
              <Link href="/signup" onClick={closeLoginModal}>
                <div className="w-full flex justify-center items-center h-[70px] shadow-xl rounded-xl bg-orange-100">
                  <h1 className="font-bold text-2xl">Sign Up</h1>
                </div>
              </Link>
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
