import React, { useState, useEffect } from "react";
import { FormBuilder } from "../common/FormBuilder";
import type { FieldConfig } from "../common/FormBuilder";
import { step2Schema, type Step2Data } from "../../schemas/step2Schema";
import { apiService } from "../../services/api.service";
import { useCachedCountries } from "../../hooks/useCachedDropdown";

interface Step2Props {
  onSubmit: (data: Step2Data) => void;
  onPrevious: () => void;
  defaultValues: Step2Data;
}

const Step2: React.FC<Step2Props> = ({
  onSubmit,
  onPrevious,
  defaultValues,
}) => {
  const {
    data: countries,
    loading: loadingCountries,
    error: countriesError,
  } = useCachedCountries();
  const [states, setStates] = useState<Array<{ value: string; label: string }>>(
    [],
  );
  const [loadingStates, setLoadingStates] = useState(false);

  // Load states for saved country on mount
  useEffect(() => {
    const loadSavedStates = async () => {
      if (defaultValues.country) {
        setLoadingStates(true);
        const data = await apiService.getStates(defaultValues.country);
        setStates(data);
        setLoadingStates(false);
      }
    };
    loadSavedStates();
  }, [defaultValues.country]);

  // Handle country change and load states
  const handleCountryChange = async (countryCode: string) => {
    if (countryCode) {
      setLoadingStates(true);
      const data = await apiService.getStates(countryCode);
      setStates(data);
      setLoadingStates(false);
    } else {
      setStates([]);
    }
  };

  const fields: FieldConfig[] = [
    {
      name: "address",
      label: "Address Line",
      type: "textarea",
      placeholder: "Enter full address",
      required: true,
      colSpan: "md:col-span-2",
      rows: 3,
    },
    {
      name: "country",
      label: "Country",
      type: "select",
      placeholder: "Select country",
      required: true,
      options: countries,
      disabled: loadingCountries,
      onChange: handleCountryChange,
    },
    {
      name: "state",
      label: "State",
      type: "select",
      placeholder: loadingStates ? "Loading states..." : "Select state",
      options: states,
      disabled: loadingStates,
    },
    {
      name: "zipCode",
      label: "ZIP / PIN Code",
      type: "text",
      placeholder: "Enter ZIP code",
      required: true,
    },
    {
      name: "bankName",
      label: "Bank Name",
      type: "text",
      placeholder: "Enter bank name",
      required: true,
    },
    {
      name: "accountNumber",
      label: "Account Number",
      type: "text",
      placeholder: "Enter account number",
      required: true,
    },
    {
      name: "ifscCode",
      label: "IFSC / SWIFT Code",
      type: "text",
      placeholder: "Enter IFSC/SWIFT code",
    },
    {
      name: "bankProof",
      label: "Bank Proof Document",
      type: "file",
      accept: ".pdf,.jpg,.png",
      maxSize: 10,
    },
  ];

  if (countriesError) {
    return (
      <div className="text-center p-4">
        <p className="text-red-500 mb-2">{countriesError}</p>
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
      schema={step2Schema}
      defaultValues={defaultValues}
      onSubmit={onSubmit}
      submitButtonText="Next Step →"
      showPreviousButton={true}
      onPrevious={onPrevious}
    />
  );
};

export default Step2;
