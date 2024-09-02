import Breadcrubs from "@/components/shared/breadcrubs";
import { type Layout } from "@/types";

const DevicesLayout = ({ children }: Layout) => {
  return (
    <div>
      <Breadcrubs items={["devices", "create"]} />
      {children}
    </div>
  );
};

export default DevicesLayout;
