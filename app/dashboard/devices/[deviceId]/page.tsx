import InfoGrid from "@/components/info-grid";
import { Component } from "@/models/component-model";
import { Device } from "@/models/device-model";
import axios from "axios";

type PageProps = {
  params: { deviceId: string };
};

type ReqDevice = Omit<Device, "components"> & {
  components: Component[];
};

const Page = async ({ params }: PageProps) => {
  const { deviceId } = params;

  const res = await axios.get(
    process.env.NEXT_PUBLIC_BASE_URL! + "/api/devices/" + deviceId
  );

  const device: ReqDevice = res.data.data;

  return (
    <div className="grid gap-16">
      <h1 className="text-3xl font-bold tracking-tight">{`Device - ${device.brand} ${device.model}`}</h1>
      <InfoGrid
        title="General Information"
        items={[
          { heading: `${device.quantity}x`, body: "Quantity" },
          { heading: device.brand, body: "Brand" },
          { heading: device.model, body: "Model" },
          { heading: device.shelf || "", body: "shelf" },
        ]}
      />
      <InfoGrid
        title="Components"
        items={device.components.map((component) => ({
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
