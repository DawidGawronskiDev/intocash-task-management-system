import { Button } from "../ui/button";

type ButtonSubmitProps = {
  isSubmitting: boolean;
  content: string;
};

const ButtonSubmit = ({ isSubmitting, content }: ButtonSubmitProps) => {
  return (
    <Button type="submit" disabled={isSubmitting}>
      {isSubmitting ? "Submitting..." : content}
    </Button>
  );
};

export default ButtonSubmit;
