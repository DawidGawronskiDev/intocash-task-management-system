import FormUpdate from "@/components/dashboard/components/form-update";
import { getComponent } from "@/lib/http";

type PageProps = {
  params: { componentId: string };
};

export default async function ComponentUpdatePage({ params }: PageProps) {
  const component = await getComponent(params.componentId);

  if (!component) {
    return <p className="text-destructive">Failed to load component</p>;
  }

  return (
    <div>
      <FormUpdate component={component} componentId={params.componentId} />
    </div>
  );
}
