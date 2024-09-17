import { columns } from "@/components/dashboard/components/columns";
import { DataTable } from "@/components/dashboard/components/data-table";
import ComponentModel, { Component } from "@/models/component-model";
import { dbConnect } from "@/lib/dbConnect";

const getComponents = async (): Promise<Component[] | null> => {
  try {
    await dbConnect();
    const components = await ComponentModel.find({}).sort({ createdAt: -1 });

    return components;
  } catch (err) {
    console.log(err);
    return null;
  }
};

const ComponentsPage = async () => {
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
};

export default ComponentsPage;
