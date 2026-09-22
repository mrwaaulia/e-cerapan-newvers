import type { InputHTMLAttributes } from "react";

interface FileUploadProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "type"
> {
  label?: string;
}

export default function FileUpload({
  label,
  className = "",
  ...props
}: FileUploadProps) {
  return (
    <div className="w-full">
      {label && (
        <label className="mb-2 block text-sm font-medium text-black">
          {label}
        </label>
      )}

      <input
        type="file"
        className={[
          "block w-full cursor-pointer rounded-md",
          "border border-gray-300 bg-white",
          "text-sm text-neutral",
          "file:mr-4 file:border-0",
          "file:bg-primary file:px-4 file:py-2.5",
          "file:font-medium file:text-white",
          "hover:file:bg-primary-hover hover:file:text-black",
          className,
        ]
          .filter(Boolean)
          .join(" ")}
        {...props}
      />
    </div>
  );
}
