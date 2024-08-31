import FormUpdate from "@/components/dashboard/components/form-update";
import { Component } from "@/models/component-model";
import axios from "axios";

const Page = async ({ params }: { params: { componentId: string } }) => {
  const { componentId } = params;

  const {
    data: { data: component },
  } = await axios.get(
    process.env.NEXT_PUBLIC_BASE_URL! + "/api/components/" + componentId
  );

  return (
    <div>
      <FormUpdate
        component={component as Component}
        componentId={componentId}
      />
    </div>
  );
};

export default Page;
