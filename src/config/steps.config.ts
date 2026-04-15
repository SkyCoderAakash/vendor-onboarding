import { step1Schema, step1InitialData } from "../schemas/step1Schema";
import { step2Schema, step2InitialData } from "../schemas/step2Schema";
import { step3Schema, step3InitialData } from "../schemas/step3Schema";
import Step1 from "../components/form/Step1";
import Step2 from "../components/form/Step2";
import Step3 from "../components/form/Step3";

export const stepsConfig = [
  {
    id: 1,
    title: "Company & Contact",
    description: "Basic company information",
    component: Step1,
    schema: step1Schema,
    initialData: step1InitialData,
    validationTrigger: "onSubmit" as const,
  },
  {
    id: 2,
    title: "Address & Bank",
    description: "Location and banking details",
    component: Step2,
    schema: step2Schema,
    initialData: step2InitialData,
    validationTrigger: "onSubmit" as const,
  },
  {
    id: 3,
    title: "Services & Declaration",
    description: "Service offerings and agreement",
    component: Step3,
    schema: step3Schema,
    initialData: step3InitialData,
    validationTrigger: "onSubmit" as const,
  },
];

export type StepId = 1 | 2 | 3;
export type StepConfig = (typeof stepsConfig)[number];

export const getStepConfig = (id: StepId) => {
  return stepsConfig.find((step) => step.id === id);
};

export const getTotalSteps = () => stepsConfig.length;

export const isLastStep = (currentStep: number) =>
  currentStep === stepsConfig.length;

export const getNextStepId = (currentStep: number): number | null => {
  return currentStep < stepsConfig.length ? currentStep + 1 : null;
};

export const getPreviousStepId = (currentStep: number): number | null => {
  return currentStep > 1 ? currentStep - 1 : null;
};
