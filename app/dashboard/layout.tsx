import Header from "@/components/dashboard/header/header";
import "@/app/globals.css";
import { Layout } from "@/types";

const DashboardLayout = ({ children }: Layout) => {
  return (
    <div>
      <Header />
      <main className="mx-auto p-4 max-w-5xl">{children}</main>
    </div>
  );
};

export default DashboardLayout;
