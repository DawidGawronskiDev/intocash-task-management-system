import { LoaderCircle } from "lucide-react";

const Loader = () => {
  return (
    <div className="grid place-content-center">
      <div className="flex items-center gap-2 animate-pulse">
        <LoaderCircle className="animate-spin" /> Loading ...
      </div>
    </div>
  );
};

export default Loader;
