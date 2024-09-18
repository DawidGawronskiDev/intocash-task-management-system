import { DataTable } from "@/components/dashboard/devices/data-table";
import { columns } from "@/components/dashboard/devices/columns";
import { getDevices } from "@/lib/http";

export default async function DevicesPage() {
  const allDevices = await getDevices();

  return (
    <div>
      <DataTable columns={columns} data={allDevices} />
    </div>
  );
}
