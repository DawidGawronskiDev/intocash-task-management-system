import FormUpdate from "@/components/dashboard/devices/form-update";
import axios from "axios";

const Page = async ({ params }: { params: { deviceId: string } }) => {
  const { deviceId } = params;

  const {
    data: { data: device },
  } = await axios.get(
    process.env.NEXT_PUBLIC_BASE_URL! + "/api/devices/" + deviceId
  );

  return (
    <div>
      <FormUpdate device={device} deviceId={deviceId} />
    </div>
  );
};
export default Page;
