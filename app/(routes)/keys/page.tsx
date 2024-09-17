import { columns } from "@/components/dashboard/keys/columns";
import { DataTable } from "@/components/dashboard/keys/data-table";
import KeyModel from "@/models/key-model";
import axios from "axios";

const Page = async () => {
  const allKeys = await KeyModel.find({}).sort({ createdAt: -1 });

  return (
    <div>
      <DataTable columns={columns} data={allKeys} />
    </div>
  );
};

export default Page;
