import { DataTable } from "@/components/dashboard/devices/data-table";
import { columns } from "@/components/dashboard/devices/columns";
import DeviceModel from "@/models/device-model";

const DevicesPage = async () => {
  const devices = await DeviceModel.find({}).sort({ createdAt: -1 });

  return (
    <div>
      <DataTable columns={columns} data={devices} />
    </div>
  );
};

export default DevicesPage;
