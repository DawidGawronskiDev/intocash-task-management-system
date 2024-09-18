import InfoGrid from "@/components/info-grid";
import { getDevice } from "@/lib/http";
import { Component } from "@/models/component-model";

type PageProps = {
  params: { deviceId: string };
};

export default async function ComponentPage({ params }: PageProps) {
  const device = await getDevice(params.deviceId);

  if (!device) {
    return <p className="text-destructive">Failed to load device</p>;
  }

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
}
