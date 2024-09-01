import ButtonSubmit from "@/components/form/button-submit";
import PopulateKeys from "@/components/form/populate-keys";
import { Button } from "@/components/ui/button";
import { FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { keyFor, keyStatues } from "@/lib/config";
import { useFieldArray, useFormContext } from "react-hook-form";

const FormContent = () => {
  const {
    control,
    formState: { isSubmitting },
  } = useFormContext();

  const { fields, remove, append } = useFieldArray({ name: "keys" });

  return (
    <div className="grid gap-8">
      <div className="grid gap-8">
        <PopulateKeys />
        <div className="grid gap-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Key</TableHead>
                <TableHead>For</TableHead>
                <TableHead>Status</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {fields.map((field, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <FormField
                      control={control}
                      name={`keys.${index}.content`}
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              onChange={field.onChange}
                              value={field.value}
                              placeholder="XXXXX-XXXXX-XXXXX-XXXXX-XXXXX"
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </TableCell>
                  <TableCell>
                    <FormField
                      control={control}
                      name={`keys.${index}.for`}
                      render={({ field }) => (
                        <FormItem>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select Windows or Office" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {keyFor.map((item) => (
                                <SelectItem key={item} value={item}>
                                  {item}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </FormItem>
                      )}
                    />
                  </TableCell>
                  <TableCell>
                    <FormField
                      control={control}
                      name={`keys.${index}.status`}
                      render={({ field }) => (
                        <FormItem>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select status" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {keyStatues.map((item) => (
                                <SelectItem key={item} value={item}>
                                  {item}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </FormItem>
                      )}
                    />
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      type="button"
                      variant="destructive"
                      onClick={() => remove(index)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Button
            type="button"
            variant="secondary"
            onClick={() => append({ for: "", content: "", status: "Unused" })}
          >
            Create Key
          </Button>
        </div>
      </div>
      <ButtonSubmit isSubmitting={isSubmitting} content="Create Keys" />
    </div>
  );
};

export default FormContent;
