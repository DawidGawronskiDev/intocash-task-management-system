import Header from "@/components/dashboard/header/header";
import "@/app/globals.css";
import { type ReactNode } from "react";

type LayoutProps = {
  children: ReactNode;
  tasks: ReactNode;
};

export default function DashboardLayout({ children, tasks }: LayoutProps) {
  return (
    <div>
      <Header />
      <main className="mx-auto p-4 max-w-5xl grid">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        {tasks}
        {children}
      </main>
    </div>
  );
}
