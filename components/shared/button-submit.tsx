import { type ReactNode } from "react";
import { Button } from "../ui/button";
import { LoaderCircle } from "lucide-react";

type ButtonSubmitProps = {
  children: ReactNode;
  isSubmitting: boolean;
};

const ButtonSubmit = ({ children, isSubmitting }: ButtonSubmitProps) => {
  return (
    <Button
      disabled={isSubmitting}
      type="submit"
      className="flex items-center gap-4"
    >
      {isSubmitting && <LoaderCircle className="animate-spin" />}
      {children}
    </Button>
  );
};

export default ButtonSubmit;
