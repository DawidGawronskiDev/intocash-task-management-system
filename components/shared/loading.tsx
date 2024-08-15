import { LoaderCircle } from "lucide-react";

const Loading = () => {
  return (
    <div className="h-full grid place-content-center">
      <div className="flex items-center gap-4 animate-pulse">
        <LoaderCircle className="animate-spin" />
        <span>Loading...</span>
      </div>
    </div>
  );
};

export default Loading;
