import React from "react";
import { FormBuilder } from "../common/FormBuilder";
import type { FieldConfig } from "../common/FormBuilder";
import { step1Schema, type Step1Data } from "../../schemas/step1Schema";
import { useCachedCompanyTypes } from "../../hooks/useCachedDropdown";

interface Step1Props {
  onSubmit: (data: Step1Data) => void;
  defaultValues: Step1Data;
}

const Step1: React.FC<Step1Props> = ({ onSubmit, defaultValues }) => {
  const { data: companyTypes, loading, error } = useCachedCompanyTypes();

  const fields: FieldConfig[] = [
    {
      name: "companyName",
      label: "Company Name",
      type: "text",
      placeholder: "Enter company name",
      required: true,
    },
    {
      name: "companyType",
      label: "Company Type",
      type: "select",
      placeholder: "Select company type",
      required: true,
      options: companyTypes,
      disabled: loading,
    },
    {
      name: "registrationNumber",
      label: "Registration Number",
      type: "text",
      placeholder: "Enter registration number",
    },
    {
      name: "establishedDate",
      label: "Established Date",
      type: "date",
    },
    {
      name: "employeeCount",
      label: "Employee Count",
      type: "number",
      placeholder: "Enter number of employees",
    },
    {
      name: "contactName",
      label: "Contact Person Name",
      type: "text",
      placeholder: "Enter contact person name",
      required: true,
    },
    {
      name: "contactEmail",
      label: "Contact Email",
      type: "email",
      placeholder: "Enter email address",
      required: true,
    },
    {
      name: "contactPhone",
      label: "Contact Phone",
      type: "tel",
      placeholder: "Enter phone number",
      required: true,
    },
    {
      name: "companyLogo",
      label: "Company Logo",
      type: "file",
      accept: "image/*",
      maxSize: 5,
    },
  ];

  if (error) {
    return (
      <div className="text-center p-4">
        <p className="text-red-500 mb-2">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <FormBuilder
      fields={fields}
      schema={step1Schema}
      defaultValues={defaultValues}
      onSubmit={onSubmit}
      submitButtonText="Next Step →"
    />
  );
};

export default Step1;
