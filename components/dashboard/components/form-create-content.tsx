import ButtonSubmit from "@/components/form/button-submit";
import FormInput from "@/components/form/form-input";
import FormSelect from "@/components/form/form-select";
import {
  componentSizes,
  componentsWithSize,
  componentTypes,
  deviceTypes,
} from "@/lib/config";
import { useFormContext } from "react-hook-form";

const FormContent = () => {
  const {
    watch,
    formState: { isSubmitting },
  } = useFormContext();

  const watchType = watch("type");

  return (
    <>
      <FormSelect
        name="type"
        label="Type*"
        placeholder="Type"
        items={componentTypes}
      />
      {componentsWithSize.includes(watchType) ? (
        <FormSelect
          name="size"
          label="Size*"
          placeholder="Size"
          items={componentSizes}
        />
      ) : (
        <FormInput name="name" label="Name*" placeholder="Name" />
      )}
      <FormSelect
        name="forDevice"
        label="For Device*"
        placeholder="Device"
        items={deviceTypes}
      />
      <FormInput name="quantity" label="Quantity*" placeholder="Quantity" />
      <ButtonSubmit isSubmitting={isSubmitting} content="Create Component" />
    </>
  );
};

export default FormContent;
