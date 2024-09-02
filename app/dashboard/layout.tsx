import Header from "@/components/dashboard/header/header";
import "@/app/globals.css";
import { ReactNode } from "react";

const DashboardLayout = ({
  children,
  tasks,
}: {
  children: ReactNode;
  tasks: ReactNode;
}) => {
  return (
    <div>
      <Header />
      <main className="mx-auto p-4 max-w-5xl">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        {tasks}
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
