"use client";

import React from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { FormControl, FormField, FormItem, FormMessage } from "../ui/form";
import { Button } from "../ui/button";
import { componentTypes } from "@/lib/config";
import useAxios from "@/hooks/useAxios";
import { Component } from "@/models/component-model";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

const FormSelectComponets = () => {
  const { data, isLoading } = useAxios<Component[]>("/api/components");
  const methods = useFormContext();
  const { fields, append, update, remove } = useFieldArray({
    name: "components",
  });

  const { watch } = methods;

  const handleTypeChange = (value: string, index: number) => {
    const updatedField = { type: value, componentId: "" };
    update(index, updatedField);
  };

  const handleComponentChange = (value: string, index: number) => {
    const watchField = watch(`components.${index}`);
    const updatedField = { ...watchField, componentId: value };
    update(index, updatedField);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (data) {
    return (
      <div className="grid gap-4">
        {fields.length > 0 && (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Type</TableHead>
                <TableHead>Component</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {fields.map((field, index) => {
                return (
                  <TableRow key={index}>
                    <TableCell>
                      <SelectType index={index} onChange={handleTypeChange} />
                    </TableCell>
                    <TableCell>
                      <SelectComponent
                        index={index}
                        onChange={handleComponentChange}
                        data={data}
                      />
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="destructive"
                        type="button"
                        onClick={() => remove(index)}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        )}

        <Button
          variant="secondary"
          type="button"
          onClick={() => append({ type: "", componentId: "" })}
        >
          Create Component
        </Button>
      </div>
    );
  }
};

type SelectTypeProps = {
  index: number;
  onChange: (value: string, index: number) => void;
};

const SelectType = ({ index, onChange }: SelectTypeProps) => {
  const { watch, control } = useFormContext();

  const watchType = watch(`components.${index}.type`);

  return (
    <FormField
      control={control}
      name={`components.${index}.type`}
      render={() => (
        <FormItem>
          <Select
            onValueChange={(value) => onChange(value, index)}
            value={watchType}
          >
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Type" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {componentTypes.map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
            <FormMessage />
          </Select>
        </FormItem>
      )}
    />
  );
};

type SelectComponentProps = {
  index: number;
  onChange: (value: string, index: number) => void;
  data: Component[];
};

const SelectComponent = ({ index, onChange, data }: SelectComponentProps) => {
  const { control, watch } = useFormContext();

  const watchField = watch(`components.${index}`);

  const filteredComponents = data.filter(
    (component) => component.type === watchField.type
  );

  if (filteredComponents.length === 0) {
    return <p className="text-destructive">No components available</p>;
  }

  return (
    <FormField
      control={control}
      name={`components.${index}.componentId`}
      render={() => (
        <FormItem>
          <Select
            onValueChange={(value) => onChange(value, index)}
            value={watchField.componentId}
          >
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Component" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {filteredComponents.map((component) => (
                <SelectItem
                  key={component._id.toString()}
                  value={component._id.toString()}
                >
                  <p>
                    {component.size && component.size + "GB"}{" "}
                    {component.name && component.name}
                  </p>
                  <p className="text-black/50 text-xs">{component.forDevice}</p>
                </SelectItem>
              ))}
            </SelectContent>
            <FormMessage />
          </Select>
        </FormItem>
      )}
    />
  );
};

export default FormSelectComponets;
