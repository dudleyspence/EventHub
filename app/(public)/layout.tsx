import Image from "next/image";
import logo from "@/public/brand/Logo.png";
import yellowGraphic from "@/public/graphics/EventHubGraphicYellow.png";
import orangeGraphic from "@/public/graphics/EventHubGraphicOrange.png";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center">
      {/* navbar with signin and signup button */}
      <Image alt="website logo" src={logo} height={45} className="mb-4" />
      {children}
    </div>
  );
}
