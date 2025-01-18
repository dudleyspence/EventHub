import DynamicNavbar from "@/components/navigation/DynamicNavbar";

export default function NonAuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="justify-items-center">
      <DynamicNavbar />
      <div className="w-full p-6 max-w-[1280px]">{children}</div>
    </div>
  );
}
