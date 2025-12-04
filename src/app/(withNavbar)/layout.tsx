import Navbar from "@/components/common/Navbar";

interface WithNavbarProps {
  children: React.ReactNode;
}

export default function WithNavbar({ children }: WithNavbarProps) {
  return (
    <>
      {children}
      <Navbar />
    </>
  );
}
