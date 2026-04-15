import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { stepsConfig } from "../../config/steps.config";
import type { Step1Data, Step2Data, Step3Data } from "../../types/form.types";

export interface FormState {
  currentStep: number;
  step1: Step1Data;
  step2: Step2Data;
  step3: Step3Data;
  // Cache for dropdown options - initialize as empty arrays
  cachedCompanyTypes: Array<{ value: string; label: string }>;
  cachedCountries: Array<{ value: string; label: string }>;
  cachedCurrencies: Array<{ value: string; label: string }>;
  cachedServices: Array<{ value: string; label: string }>;
  cachedPricingModels: Array<{ value: string; label: string }>;
}

const initialState: FormState = {
  currentStep: 1,
  step1: stepsConfig[0]?.initialData as Step1Data,
  step2: stepsConfig[1]?.initialData as Step2Data,
  step3: stepsConfig[2]?.initialData as Step3Data,
  // Initialize as empty arrays
  cachedCompanyTypes: [],
  cachedCountries: [],
  cachedCurrencies: [],
  cachedServices: [],
  cachedPricingModels: [],
};

const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    updateStep1: (state, action: PayloadAction<Partial<Step1Data>>) => {
      state.step1 = { ...state.step1, ...action.payload };
    },
    updateStep2: (state, action: PayloadAction<Partial<Step2Data>>) => {
      state.step2 = { ...state.step2, ...action.payload };
    },
    updateStep3: (state, action: PayloadAction<Partial<Step3Data>>) => {
      state.step3 = { ...state.step3, ...action.payload };
    },
    setCurrentStep: (state, action: PayloadAction<number>) => {
      state.currentStep = action.payload;
    },
    resetForm: () => initialState,
    // Cache actions
    cacheCompanyTypes: (
      state,
      action: PayloadAction<Array<{ value: string; label: string }>>,
    ) => {
      state.cachedCompanyTypes = action.payload;
    },
    cacheCountries: (
      state,
      action: PayloadAction<Array<{ value: string; label: string }>>,
    ) => {
      state.cachedCountries = action.payload;
    },
    cacheCurrencies: (
      state,
      action: PayloadAction<Array<{ value: string; label: string }>>,
    ) => {
      state.cachedCurrencies = action.payload;
    },
    cacheServices: (
      state,
      action: PayloadAction<Array<{ value: string; label: string }>>,
    ) => {
      state.cachedServices = action.payload;
    },
    cachePricingModels: (
      state,
      action: PayloadAction<Array<{ value: string; label: string }>>,
    ) => {
      state.cachedPricingModels = action.payload;
    },
  },
});

export const {
  updateStep1,
  updateStep2,
  updateStep3,
  setCurrentStep,
  resetForm,
  cacheCompanyTypes,
  cacheCountries,
  cacheCurrencies,
  cacheServices,
  cachePricingModels,
} = formSlice.actions;

export default formSlice.reducer;
