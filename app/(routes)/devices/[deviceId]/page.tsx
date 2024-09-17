import InfoGrid from "@/components/info-grid";
import { Component } from "@/models/component-model";
import DeviceModel, { Device } from "@/models/device-model";

type PageProps = {
  params: { deviceId: string };
};

const Page = async ({ params }: PageProps) => {
  const device = await DeviceModel.findOne({ _id: params.deviceId }).populate(
    "components"
  );

  return (
    <div className="grid gap-16">
      <h1 className="text-3xl font-bold tracking-tight">{`Device - ${device.brand} ${device.model}`}</h1>
      <InfoGrid
        title="General Information"
        items={[
          { heading: `${device.quantity}x`, body: "Quantity" },
          { heading: device.brand, body: "Brand" },
          { heading: device.model, body: "Model" },
          { heading: device.condition, body: "Condition" },
          { heading: device.shelf || "", body: "shelf" },
        ]}
      />
      <InfoGrid
        title="Software"
        items={[
          { heading: device.os, body: "Operating System" },
          {
            heading: device.drivers ? "Installed" : "Not installed",
            body: "Drivers",
          },
          {
            heading: device.office ? "Installed" : "Not installed",
            body: "Office",
          },
          {
            heading: device.activation ? "Activated" : "Not activated",
            body: "Activation",
          },
        ]}
      />
      <InfoGrid
        title="Components"
        items={device.components.map((component: Component) => ({
          heading: `${component.size && component.size + "GB"} ${
            component.name ? component.name : ""
          }`,
          body: component.type,
        }))}
      />
    </div>
  );
};

export default Page;
