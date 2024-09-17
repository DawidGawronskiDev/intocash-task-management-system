import FormUpdate from "@/components/dashboard/keys/form-update";
import KeyModel from "@/models/key-model";

const Page = async ({ params }: { params: { keyId: string } }) => {
  const key = await KeyModel.findOne({ _id: params.keyId });

  return (
    <div>
      <FormUpdate data={key} />
    </div>
  );
};

export default Page;
