import { columns } from "@/components/dashboard/components/columns";
import { DataTable } from "@/components/dashboard/components/data-table";
import { getComponents } from "@/lib/http";

export default async function ComponentsPage() {
  const components = await getComponents();

  if (!components) {
    return <p className="text-destructive">Failed to fetch components</p>;
  }

  console.log(components);

  return (
    <div>
      <DataTable columns={columns} data={components} />
    </div>
  );
}
