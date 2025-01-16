import Image from "next/image";
import logo from "@/public/brand/Logo.png";
import yellowGraphic from "@/public/graphics/EventHubGraphicYellow.png";
import orangeGraphic from "@/public/graphics/EventHubGraphicOrange.png";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center">
      <Image
        alt="graphic"
        src={yellowGraphic}
        height={450}
        className="hidden mb-4 xs:block fixed top-[-250] right-[-250]"
      />
      <Image
        alt="graphic"
        src={orangeGraphic}
        height={700}
        className="hidden mb-4 xs:block fixed bottom-[-250] left-[-250]"
      />
      <Image alt="website logo" src={logo} height={45} className="mb-4" />
      {children}
    </div>
  );
}
