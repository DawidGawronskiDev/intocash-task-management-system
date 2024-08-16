import {
  FieldValues,
  useFieldArray,
  UseFieldArrayReturn,
  useFormContext,
} from "react-hook-form";
import { FormControl, FormField, FormItem, FormMessage } from "../ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Component } from "@/types";
import { Button } from "../ui/button";
import { componentTypes } from "@/lib/config";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { useState } from "react";

type SelectComponentsProps = {
  data: Component[];
};

const SelectComponents = ({ data }: SelectComponentsProps) => {
  const { watch } = useFormContext();

  const fieldMethods = useFieldArray({
    name: "components",
  });

  const { append, fields } = fieldMethods;

  const watchComponents = watch("components");

  return (
    <div className="grid gap-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Type</TableHead>
            <TableHead>Component</TableHead>
            <TableHead className="px-4 text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {fields.map((field, index) => (
            <SelectComponent
              key={field.id}
              fieldMethods={fieldMethods}
              data={data}
              field={field}
              index={index}
            />
          ))}
        </TableBody>
      </Table>
      <Button
        type="button"
        onClick={() => append({ type: "", componentId: "" })}
      >
        Add Component
      </Button>
    </div>
  );
};

type SelectComponentProps = {
  data: Component[];
  fieldMethods: UseFieldArrayReturn<FieldValues, "components", "id">;
  field: Record<"id", string>;
  index: number;
};

const SelectComponent = ({
  data,
  fieldMethods,
  field,
  index,
}: SelectComponentProps) => {
  const [currentType, setCurrentType] = useState<string>("");
  const { control, setValue } = useFormContext();

  const handleCurrentType = (value: string) => {
    setCurrentType(value);
  };

  const filteredComponents = data.filter(
    (component) => component.type === currentType
  );

  return (
    <TableRow className="*:align-top">
      <SelectType index={index} onChange={handleCurrentType} />
      <SelectId index={index} filteredComponents={filteredComponents} />
      <TableCell className="text-right w-0">
        <Button
          type="button"
          variant="destructive"
          onClick={() => fieldMethods.remove(index)}
          className="m-0"
        >
          Delete
        </Button>
      </TableCell>
    </TableRow>
  );
};

type SelectTypeProps = {
  index: number;
  onChange: (value: string) => void;
};

const SelectType = ({ index, onChange }: SelectTypeProps) => {
  const { control, setValue } = useFormContext();

  return (
    <TableCell className="w-48">
      <FormField
        control={control}
        name={`components.${index}.type`}
        render={({ field }) => (
          <FormItem>
            <Select
              onValueChange={(value) => {
                onChange(value),
                  field.onChange(value),
                  setValue(`components.${index}.componentId`, "");
              }}
              value={field.value}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {componentTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
    </TableCell>
  );
};

type SelectIdProps = {
  index: number;
  filteredComponents: Component[];
};

const SelectId = ({ index, filteredComponents }: SelectIdProps) => {
  const { control } = useFormContext();

  return (
    <TableCell>
      <FormField
        control={control}
        name={`components.${index}.componentId`}
        render={({ field }) => (
          <FormItem>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select component" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {filteredComponents.map((component) => (
                  <SelectItem key={component._id} value={component._id}>
                    {component.name || component.size}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
    </TableCell>
  );
};

export default SelectComponents;
