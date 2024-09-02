import Breadcrubs from "@/components/shared/breadcrubs";
import { Layout } from "@/types";

const KeysLayout = ({ children }: Layout) => {
  return (
    <div>
      <Breadcrubs items={["keys", "create"]} />
      {children}
    </div>
  );
};

export default KeysLayout;
