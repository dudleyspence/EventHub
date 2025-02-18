import { useCurrentUser } from "@/hooks/useCurrentUser";
import React from "react";
import { MdEmail } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import Image from "next/image";

export default function AdminProfileTab() {
  const user = useCurrentUser();

  return (
    <div className="pl-6 p-4 rounded-xl w-screen max-w-[500px] bg-orange-400 flex flex-row gap-10 items-center">
      <Image
        src={
          user?.image
            ? user.image
            : "https://www.freeiconspng.com/uploads/am-a-19-year-old-multimedia-artist-student-from-manila--21.png"
        }
        width={80}
        height={80}
        className="rounded-2xl"
        alt="profile image"
      />
      <div className="flex flex-col gap-3 ">
        <h2 className="flex flex-row gap-3 items-center font-bold">
          <FaUser color="black" size={20} />
          {user?.email}
        </h2>
        <h2 className="flex flex-row gap-3 items-center ">
          <MdEmail color="black" size={20} />
          {user?.name}
        </h2>
      </div>
    </div>
  );
}
