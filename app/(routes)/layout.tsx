import Header from "@/components/dashboard/header/header";
import { type ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Header />
      <div className="mx-auto max-w-5xl p-4">{children}</div>
    </>
  );
};

export default Layout;
