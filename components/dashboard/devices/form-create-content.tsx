import ButtonSubmit from "@/components/form/button-submit";
import FormCheckbox from "@/components/form/form-checkbox";
import FormInput from "@/components/form/form-input";
import FormSelect from "@/components/form/form-select";
import FormSelectComponets from "@/components/form/form-select-component";
import {
  brands,
  deviceConditions,
  deviceTypes,
  operatingSystems,
} from "@/lib/config";
import React from "react";

const FormContent = () => {
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

      <FormSelect
        name="os"
        label="Operating System"
        placeholder="Select a operating system"
        items={operatingSystems}
      />
      <FormCheckbox name="drivers" label="Drivers" />
      <FormCheckbox name="office" label="Office" />
      <FormCheckbox name="activation" label="Activation" />
      <FormSelect
        name="condition"
        label="Condition"
        placeholder="Select condition"
        items={deviceConditions}
      />
      <FormInput name="quantity" label="Quantity" placeholder="Quantity" />
    </>
  );
};

export default FormContent;
