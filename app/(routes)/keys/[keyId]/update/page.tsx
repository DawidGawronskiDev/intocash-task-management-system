import FormUpdate from "@/components/dashboard/keys/form-update";
import { getKey } from "@/lib/http";

type PageProps = {
  params: { keyId: string };
};

export default async function KeyUpdatePage({ params }: PageProps) {
  const key = await getKey(params.keyId);

  if (!key) {
    return <p className="text-destructive">Failed to load key</p>;
  }

  return (
    <div>
      <FormUpdate data={key} />
    </div>
  );
}
