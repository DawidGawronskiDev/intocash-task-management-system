import Header from "@/components/dashboard/header";
import { Layout } from "@/types";

const DashboardLayout = ({ children }: Layout) => {
  return (
    <div>
      <Header />
      {children}
    </div>
  );
};

export default DashboardLayout;
