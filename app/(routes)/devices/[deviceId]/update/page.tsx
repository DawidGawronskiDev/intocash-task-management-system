import FormUpdate from "@/components/dashboard/devices/form-update";
import DeviceModel from "@/models/device-model";

const Page = async ({ params }: { params: { deviceId: string } }) => {
  const device = await DeviceModel.findOne({ _id: params.deviceId });

  return (
    <div>
      <FormUpdate device={device} deviceId={params.deviceId} />
    </div>
  );
};
export default Page;
