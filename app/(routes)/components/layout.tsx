import Breadcrubs from "@/components/shared/breadcrubs";
import { Layout } from "@/types";

const ComponentsLayout = ({ children }: Layout) => {
  return (
    <div>
      <Breadcrubs items={["components", "create"]} />
      {children}
    </div>
  );
};

export default ComponentsLayout;
