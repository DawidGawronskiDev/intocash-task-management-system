import ButtonSubmit from "@/components/form/button-submit";
import FormInput from "@/components/form/form-input";
import FormSelect from "@/components/form/form-select";
import FormSelectComponets from "@/components/form/form-select-component";
import { brands, deviceTypes } from "@/lib/config";
import React from "react";
import { useFormContext } from "react-hook-form";

const FormContent = () => {
  const {
    formState: { isSubmitting },
  } = useFormContext();

  return (
    <>
      <FormSelect
        name="type"
        label="Type"
        placeholder="Type"
        items={deviceTypes}
      />
      <FormSelect
        name="brand"
        label="Brand"
        placeholder="Brand"
        items={brands}
      />
      <FormInput name="model" label="Model" placeholder="Model" />
      <FormInput name="shelf" label="Shelf" placeholder="Shelf" />
      <FormSelectComponets />
      <FormInput name="quantity" label="Quantity" placeholder="Quantity" />
      <ButtonSubmit isSubmitting={isSubmitting} content="Create Device" />
    </>
  );
};

export default FormContent;
