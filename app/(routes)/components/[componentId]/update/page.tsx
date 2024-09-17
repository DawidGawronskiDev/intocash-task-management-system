import FormUpdate from "@/components/dashboard/components/form-update";
import ComponentModel, { Component } from "@/models/component-model";

const Page = async ({ params }: { params: { componentId: string } }) => {
  const component = await ComponentModel.findOne({ _id: params.componentId });

  return (
    <div>
      <FormUpdate
        component={component as Component}
        componentId={params.componentId}
      />
    </div>
  );
};

export default Page;
