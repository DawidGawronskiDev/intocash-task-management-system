"use client";

import FormCreate from "@/components/devices/form-create";
import Loading from "@/components/shared/loading";
import Error from "@/components/shared/error";
import { getComponents } from "@/lib/http";
import { useQuery } from "@tanstack/react-query";

import { ReactNode } from "react";

const DevicePage = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["components"],
    queryFn: getComponents,
  });

  let content: ReactNode;

  if (isLoading) content = <Loading />;
  if (error) content = <Error message="Failed to fetch components" />;
  if (data) content = <FormCreate data={data} />;

  return (
    <div className="h-full flex items-center justify-center">{content}</div>
  );
};

export default DevicePage;
