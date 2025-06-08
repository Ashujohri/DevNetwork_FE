import Navbar from "@/app/components/Navbar/Navbar";
import Footer from "@/app/components/Footer/Footer";
import UserPreview from "@/app/components/Preview/UserPreview";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <UserPreview />
      <main>{children}</main>
      <Footer />
    </>
  );
}
