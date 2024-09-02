import axios from "axios";
import { columns } from "@/components/dashboard/components/columns";
import { DataTable } from "@/components/dashboard/components/data-table";
import { Component } from "@/models/component-model";

const ComponentsPage = async () => {
  const res = await axios.get(
    process.env.NEXT_PUBLIC_BASE_URL! + "/api/components"
  );

  const components: Component[] = res.data;

  return (
    <div>
      <DataTable columns={columns} data={components} />
    </div>
  );
};

export default ComponentsPage;
