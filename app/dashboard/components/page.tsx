"use client";

import { DataTable } from "@/components/shared/data-table";
import { getComponents } from "@/lib/http";
import { useQuery } from "@tanstack/react-query";
import { columns } from "./columns";
import Loading from "@/components/shared/loading";

const ComponentsPage = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["components"],
    queryFn: getComponents,
  });

  console.log(data);

  if (isLoading) {
    return <Loading />;
  } else if (data) {
    return (
      <div className="max-w-5xl p-4 mx-auto">
        <DataTable columns={columns} data={data} />
      </div>
    );
  }
};

export default ComponentsPage;
