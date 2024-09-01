"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { useFormContext } from "react-hook-form";

const PopulateKeys = () => {
  const { setValue, getValues } = useFormContext();
  const [value, setInputValue] = useState("");

  const handleChange = (value: string) => {
    setInputValue(value);
  };

  const populateKeys = () => {
    const splittedValue = value.split("\n");

    const keys = splittedValue.reduce(
      (acc, cur, index) => {
        if (cur.includes("Windows")) {
          acc[0].keys.push(splittedValue[index + 1]);
        }

        if (cur.includes("Office")) {
          acc[1].keys.push(splittedValue[index + 1]);
        }

        return acc;
      },
      [
        {
          for: "Windows",
          status: "Unused",
          keys: [] as string[],
        },
        {
          for: "Office",
          status: "Unused",
          keys: [] as string[],
        },
      ]
    );

    const curKeys: any[] = [];

    keys[0].keys.forEach((key) =>
      curKeys.push({
        content: key,
        for: "Windows",
        status: "Unused",
      })
    );

    keys[1].keys.forEach((key) =>
      curKeys.push({
        content: key,
        for: "Office",
        status: "Unused",
      })
    );

    const prevKeys = getValues("keys");

    setValue("keys", [...prevKeys, ...curKeys]);

    setInputValue("");
  };

  return (
    <div className="grid gap-4">
      <Textarea onChange={(e) => handleChange(e.target.value)} value={value} />
      <Button type="button" variant="secondary" onClick={populateKeys}>
        Populate keys
      </Button>
    </div>
  );
};

export default PopulateKeys;
