import React from "react";
import { FormBuilder } from "../common/FormBuilder";
import type { FieldConfig } from "../common/FormBuilder";
import { step3Schema, type Step3Data } from "../../schemas/step3Schema";
import {
  useCachedCurrencies,
  useCachedServices,
  useCachedPricingModels,
} from "../../hooks/useCachedDropdown";

interface Step3Props {
  onSubmit: (data: Step3Data) => void;
  onPrevious: () => void;
  defaultValues: Step3Data;
  isSubmitting?: boolean;
}

const Step3: React.FC<Step3Props> = ({
  onSubmit,
  onPrevious,
  defaultValues,
  isSubmitting,
}) => {
  const {
    data: currencies,
    loading: loadingCurrencies,
    error: currenciesError,
  } = useCachedCurrencies();
  const {
    data: services,
    loading: loadingServices,
    error: servicesError,
  } = useCachedServices();
  const {
    data: pricingModels,
    loading: loadingPricing,
    error: pricingError,
  } = useCachedPricingModels();

  const error = currenciesError || servicesError || pricingError;

  const fields: FieldConfig[] = [
    {
      name: "services",
      label: "Services Offered",
      type: "checkbox",
      required: true,
      options: services,
      disabled: loadingServices,
      colSpan: "md:col-span-2",
    },
    {
      name: "pricingModel",
      label: "Pricing Model",
      type: "radio",
      required: true,
      options: pricingModels,
      disabled: loadingPricing,
    },
    {
      name: "currency",
      label: "Preferred Currency",
      type: "select",
      placeholder: loadingCurrencies
        ? "Loading currencies..."
        : "Select currency",
      required: true,
      options: currencies,
      disabled: loadingCurrencies,
    },
    {
      name: "declaration",
      label:
        "I hereby declare that all the information provided is true and correct",
      type: "checkbox",
      required: true,
      colSpan: "md:col-span-2",
    },
    {
      name: "additionalNotes",
      label: "Additional Notes",
      type: "textarea",
      placeholder: "Any additional information you'd like to share...",
      rows: 4,
      colSpan: "md:col-span-2",
    },
    {
      name: "finalDoc",
      label: "Final Document (KYC Proof)",
      type: "file",
      accept: ".pdf,.jpg,.png",
      maxSize: 10,
      colSpan: "md:col-span-2",
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
      schema={step3Schema}
      defaultValues={defaultValues}
      onSubmit={onSubmit}
      submitButtonText="Submit Application"
      showPreviousButton={true}
      onPrevious={onPrevious}
      isSubmitting={isSubmitting}
    />
  );
};

export default Step3;
