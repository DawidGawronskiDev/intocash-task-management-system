import FormUpdate from "@/components/dashboard/devices/form-update";
import { getDevice } from "@/lib/http";

type PageProps = {
  params: { deviceId: string };
};

export default async function ComponentUpdatePage({ params }: PageProps) {
  const device = await getDevice(params.deviceId);

  if (!device) return <p className="text-destructive">Failed to find device</p>;

  return (
    <div>
      <FormUpdate device={device} deviceId={params.deviceId} />
    </div>
  );
}
