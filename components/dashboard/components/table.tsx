import { Component } from "@/models/component-model";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import axios from "axios";

const ComponentsTable = async () => {
  const res = await axios.get(
    process.env.NEXT_PUBLIC_BASE_URL! + "/api/components"
  );

  const components: Component[] = res.data;

  if (components) {
    return <DataTable columns={columns} data={components} />;
  }
};

export default ComponentsTable;
