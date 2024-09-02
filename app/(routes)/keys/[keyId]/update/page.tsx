import FormUpdate from "@/components/dashboard/keys/form-update";
import axios from "axios";

const Page = async ({ params }: { params: { keyId: string } }) => {
  const { keyId } = params;
  const {
    data: { data: key },
  } = await axios.get(process.env.NEXT_PUBLIC_BASE_URL! + "/api/keys/" + keyId);

  console.log(key);

  return (
    <div>
      <FormUpdate data={key} />
    </div>
  );
};

export default Page;
