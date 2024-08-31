import Breadcrubs from "@/components/shared/breadcrubs";
import { Layout } from "@/types";

const ComponentsLayout = ({ children }: Layout) => {
  return (
    <div>
      <Breadcrubs items={["dashboard", "components", "create"]} />
      {children}
    </div>
  );
};

export default ComponentsLayout;
