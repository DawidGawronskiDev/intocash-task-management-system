import Table from "@/components/dashboard/devices/table";
import { Suspense } from "react";
import Loading from "./loading";

const DevicesPage = () => {
  return (
    <div>
      <Suspense fallback={<Loading />}>
        <Table />
      </Suspense>
    </div>
  );
};

export default DevicesPage;
