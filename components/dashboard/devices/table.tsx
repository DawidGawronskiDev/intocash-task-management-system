import axios from "axios";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { Device } from "@/models/device-model";

const Table = async () => {
  const res = await axios.get(
    process.env.NEXT_PUBLIC_BASE_URL! + "/api/devices"
  );

  const devices: Device[] = res.data;

  return <DataTable columns={columns} data={devices} />;
};

export default Table;
