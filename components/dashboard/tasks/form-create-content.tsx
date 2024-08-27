"use client";

import ButtonSubmit from "@/components/form/button-submit";
import FormCheckbox from "@/components/form/form-checkbox";
import FormInput from "@/components/form/form-input";
import FormSelect from "@/components/form/form-select";
import FormSelectComponets from "@/components/form/form-select-component";
import { Checkbox } from "@/components/ui/checkbox";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useAxios from "@/hooks/useAxios";
import { operatingSystems, taskStatuses } from "@/lib/config";
import { Device } from "@/models/device-model";
import { useFormContext } from "react-hook-form";

const FormContent = () => {
  const {
    control,
    formState: { isSubmitting },
  } = useFormContext();
  const {
    data: devices,
    isLoading,
    error,
  } = useAxios<Device[]>("/api/devices");

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <FormField
        control={control}
        name="device"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Device</FormLabel>
            <Select onValueChange={field.onChange} value={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Device" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {devices!
                  .filter((device) => device.quantity > 0)
                  .map((device) => (
                    <SelectItem
                      key={device._id}
                      value={device._id}
                      className="flex items-center justify-between"
                    >
                      <p>
                        {device.brand} {device.model}
                      </p>
                      <p className="opacity-50">x{device.quantity}</p>
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </FormItem>
        )}
      />
      <FormSelectComponets />
      <FormSelect
        name="os"
        label="Operating System"
        placeholder="Operating System"
        items={operatingSystems}
      />
      <FormCheckbox name="drivers" label="Drivers" />
      <FormCheckbox name="office" label="Office" />
      <FormCheckbox name="activation" label="Activation" />
      <FormInput name="quantity" label="Quantity" />
      <FormSelect
        name="status"
        label="Status"
        placeholder="Status"
        items={taskStatuses}
      />
      <ButtonSubmit isSubmitting={isSubmitting} content="Create Task" />
    </>
  );
};

export default FormContent;
