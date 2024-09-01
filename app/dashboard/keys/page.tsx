import { columns } from "@/components/dashboard/keys/columns";
import { DataTable } from "@/components/dashboard/keys/data-table";
import axios from "axios";

const Page = async () => {
  const {
    data: { data: keys },
  } = await axios.get(process.env.NEXT_PUBLIC_BASE_URL! + "/api/keys");

  return (
    <div>
      <DataTable columns={columns} data={keys} />
    </div>
  );
};

export default Page;
