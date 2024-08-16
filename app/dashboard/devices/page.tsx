"use client";

import { DataTable } from "@/components/shared/data-table";
import Error from "@/components/shared/error";
import Loading from "@/components/shared/loading";
import { useQuery } from "@tanstack/react-query";
import { type ReactNode } from "react";
import { getDevices } from "@/lib/http";
import columns from "./columns";

const DevicesPage = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["devices"],
    queryFn: getDevices,
  });

  let content: ReactNode;

  if (isLoading) content = <Loading />;
  if (error) content = <Error message="Failed to fetch devices" />;
  if (data)
    content = (
      <div className="p-4">
        <DataTable columns={columns} data={data} />
      </div>
    );

  return content;
};

export default DevicesPage;
