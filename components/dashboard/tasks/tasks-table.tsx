import axios from "axios";
import React from "react";
import { DataTable } from "./data-table";
import { columns } from "./columns";

const TasksTable = async () => {
  const {
    data: { data: tasks },
  } = await axios.get(process.env.NEXT_PUBLIC_BASE_URL + "/api/tasks");

  return <DataTable columns={columns} data={tasks} />;
};

export default TasksTable;
