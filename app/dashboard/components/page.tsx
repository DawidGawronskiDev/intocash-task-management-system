import ComponentsTable from "@/components/dashboard/components/table";
import { Suspense } from "react";
import Loading from "./loading";

const ComponentsPage = async () => {
  return (
    <div>
      <Suspense fallback={<Loading />}>
        <ComponentsTable />
      </Suspense>
    </div>
  );
};

export default ComponentsPage;
