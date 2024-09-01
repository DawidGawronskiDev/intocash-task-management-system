import ButtonSubmit from "@/components/form/button-submit";
import FormInput from "@/components/form/form-input";
import FormSelect from "@/components/form/form-select";
import { keyFor, keyStatues } from "@/lib/config";
import { useFormContext } from "react-hook-form";

const FormContent = () => {
  const {
    formState: { isSubmitting },
  } = useFormContext();

  return (
    <>
      <FormInput
        name="content"
        label="Key"
        placeholder="XXXXX-XXXXX-XXXXX-XXXXX-XXXXX"
      />
      <FormSelect name="for" label="For" items={keyFor} />
      <FormSelect name="status" label="Status" items={keyStatues} />
      <ButtonSubmit isSubmitting={isSubmitting} content="Update key" />
    </>
  );
};

export default FormContent;
