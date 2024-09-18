import Breadcrubs from "@/components/shared/breadcrubs";
import { type Layout } from "@/types";

export default function KeysLayout({ children }: Layout) {
  return (
    <div>
      <Breadcrubs items={["keys", "create"]} />
      {children}
    </div>
  );
}
