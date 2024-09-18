import Header from "@/components/dashboard/header/header";
import { type ReactNode } from "react";

type LayoutProps = { children: ReactNode };

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <Header />
      <div className="mx-auto max-w-5xl p-4">{children}</div>
    </>
  );
}
