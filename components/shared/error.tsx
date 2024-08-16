type ErrorProps = {
  message: string;
};

const Error = ({ message }: ErrorProps) => {
  return (
    <div className="h-full grid place-content-center">
      <div className="flex items-center gap-4">
        <span className="text-sm font-medium text-red-500">{message}</span>
      </div>
    </div>
  );
};

export default Error;
