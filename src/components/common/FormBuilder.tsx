import React, { useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "./Input";

export interface FieldConfig {
  name: string;
  label: string;
  type:
    | "text"
    | "email"
    | "tel"
    | "number"
    | "date"
    | "textarea"
    | "file"
    | "select"
    | "checkbox"
    | "radio";
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  colSpan?: string;
  options?: Array<{ value: string; label: string }>;
  accept?: string;
  maxSize?: number;
  rows?: number;
  onChange?: (value: any) => void;
}

interface FormBuilderProps {
  fields: FieldConfig[];
  schema: any;
  defaultValues: Record<string, any>;
  onSubmit: (data: any) => void;
  submitButtonText?: string;
  showPreviousButton?: boolean;
  onPrevious?: () => void;
  isSubmitting?: boolean;
  className?: string;
  gridCols?: string;
}

export const FormBuilder: React.FC<FormBuilderProps> = ({
  fields,
  schema,
  defaultValues,
  onSubmit,
  submitButtonText = "Next Step →",
  showPreviousButton = false,
  onPrevious,
  isSubmitting = false,
  className = "",
  gridCols = "grid-cols-1 md:grid-cols-2",
}) => {
  const methods = useForm({
    resolver: zodResolver(schema),
    defaultValues,
    mode: "onChange",
  });

  const { handleSubmit, reset } = methods;

  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues, reset]);
  console.log(fields);
  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={`space-y-6 ${className}`}
      >
        <div className={`grid ${gridCols} gap-6`}>
          {fields.map((field) => (
            <div key={field.name} className={field.colSpan || "md:col-span-1"}>
              <Input
                name={field.name}
                label={field.label}
                type={field.type}
                placeholder={field.placeholder}
                required={field.required}
                disabled={field.disabled}
                options={field.options}
                accept={field.accept}
                maxSize={field.maxSize}
                rows={field.rows}
                onChange={field.onChange}
              />
            </div>
          ))}
        </div>

        <div
          className={`flex ${showPreviousButton ? "justify-between" : "justify-end"} mt-6`}
        >
          {showPreviousButton && (
            <button
              type="button"
              onClick={onPrevious}
              className="cursor-pointer px-6 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-colors"
            >
              ← Previous
            </button>
          )}
          <button
            type="submit"
            disabled={isSubmitting}
            className="cursor-pointer px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Submitting..." : submitButtonText}
          </button>
        </div>
      </form>
    </FormProvider>
  );
};
