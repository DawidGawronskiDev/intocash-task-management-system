import { columns } from "@/components/dashboard/keys/columns";
import { DataTable } from "@/components/dashboard/keys/data-table";
import { getKeys } from "@/lib/http";

export default async function KeysPage() {
  const allKeys = await getKeys();

  if (!allKeys) return <p className="text-destructive">Failed to load keys</p>;

  return (
    <div>
      <DataTable columns={columns} data={allKeys} />
    </div>
  );
}
