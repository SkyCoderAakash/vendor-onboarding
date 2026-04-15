import React from "react";
import { useFormContext } from "react-hook-form";
import FileUpload from "./FileUpload";

type InputType =
  | "text"
  | "email"
  | "tel"
  | "number"
  | "date"
  | "password"
  | "textarea"
  | "file"
  | "checkbox"
  | "radio"
  | "select";

interface Option {
  value: string;
  label: string;
}

interface InputProps {
  name: string;
  label?: string;
  type: InputType;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  rows?: number;
  options?: Option[];
  accept?: string;
  maxSize?: number;
  onChange?: (value: any) => void;
}

export const Input: React.FC<InputProps> = ({
  name,
  label,
  type,
  placeholder,
  required = false,
  disabled = false,
  className = "",
  rows = 3,
  options = [],
  accept = "*/*",
  maxSize = 5,
  onChange: externalOnChange,
}) => {
  const {
    register,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext();
  const error = errors[name];
  const currentValue = watch(name);

  const handleFileUpload = (fileId: string | null) => {
    setValue(name, fileId);
  };

  const renderInput = () => {
    switch (type) {
      case "textarea":
        return (
          <textarea
            id={name}
            {...register(name)}
            placeholder={placeholder}
            disabled={disabled}
            rows={rows}
            className={`
              w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500
              transition duration-150 ease-in-out resize-vertical
              ${error ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:border-blue-500"}
              ${disabled ? "bg-gray-100 cursor-not-allowed" : ""}
            `}
          />
        );

      case "select":
        return (
          <select
            id={name}
            {...register(name)}
            disabled={disabled}
            onChange={(e) => {
              register(name).onChange(e);
              if (externalOnChange) externalOnChange(e.target.value);
            }}
            className={`
              w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500
              transition duration-150 ease-in-out
              ${error ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:border-blue-500"}
              ${disabled ? "bg-gray-100 cursor-not-allowed" : ""}
            `}
          >
            <option value="">{placeholder || "Select an option"}</option>
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );

      case "checkbox":
        return (
          <div className="flex items-center">
            <input
              type="checkbox"
              id={name}
              {...register(name)}
              disabled={disabled}
              onChange={(e) => {
                register(name).onChange(e);
                if (externalOnChange) externalOnChange(e.target.checked);
              }}
              className={`
                w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500
                ${disabled ? "bg-gray-100 cursor-not-allowed" : ""}
              `}
            />
            <label htmlFor={name} className="ml-2 text-sm text-gray-700">
              {label}
            </label>
          </div>
        );

      case "radio":
        return (
          <div className="space-y-2">
            {options.map((option) => (
              <label key={option.value} className="flex items-center">
                <input
                  type="radio"
                  value={option.value}
                  {...register(name)}
                  disabled={disabled}
                  onChange={(e) => {
                    register(name).onChange(e);
                    if (externalOnChange) externalOnChange(e.target.value);
                  }}
                  className={`
                    w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500
                    ${disabled ? "bg-gray-100 cursor-not-allowed" : ""}
                  `}
                />
                <span className="ml-2 text-sm text-gray-700">
                  {option.label}
                </span>
              </label>
            ))}
          </div>
        );

      case "file":
        return (
          <FileUpload
            onUpload={handleFileUpload}
            accept={accept}
            label={label || ""}
            existingFileId={currentValue}
            required={required}
            error={error?.message as string}
            maxSize={maxSize}
          />
        );

      default:
        return (
          <input
            id={name}
            type={type}
            {...register(name, {
              valueAsNumber: type === "number",
            })}
            placeholder={placeholder}
            disabled={disabled}
            onChange={(e) => {
              register(name).onChange(e);
              if (externalOnChange) externalOnChange(e.target.value);
            }}
            className={`
              w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500
              transition duration-150 ease-in-out
              ${error ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:border-blue-500"}
              ${disabled ? "bg-gray-100 cursor-not-allowed" : ""}
            `}
          />
        );
    }
  };

  if (type === "checkbox") {
    return <div className={className}>{renderInput()}</div>;
  }

  return (
    <div className={`w-full ${className}`}>
      {label && type !== "file" && (
        <label
          htmlFor={name}
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      {renderInput()}
      {error && type !== "file" && (
        <p className="mt-1 text-sm text-red-500">{error.message as string}</p>
      )}
    </div>
  );
};
