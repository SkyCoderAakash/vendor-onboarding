import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import {
  updateStep1,
  updateStep2,
  updateStep3,
  setCurrentStep,
  resetForm,
} from "../store/slices/formSlice";
import {
  stepsConfig,
  getNextStepId,
  getPreviousStepId,
} from "../config/steps.config";
import ProgressBar from "../components/common/ProgressBar";
import { CheckCircle } from "lucide-react";

const Onboarding: React.FC = () => {
  const dispatch = useAppDispatch();
  const currentStepId = useAppSelector((state) => state.form.currentStep);
  const formData = useAppSelector((state) => state.form);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const currentStepConfig = stepsConfig.find(
    (step) => step.id === currentStepId,
  );
  const CurrentStepComponent = currentStepConfig?.component;

  const getCurrentStepData = () => {
    switch (currentStepId) {
      case 1:
        return formData.step1;
      case 2:
        return formData.step2;
      case 3:
        return formData.step3;
      default:
        return currentStepConfig?.initialData || {};
    }
  };

  const updateStepData = (stepId: number, data: any) => {
    switch (stepId) {
      case 1:
        dispatch(updateStep1(data));
        break;
      case 2:
        dispatch(updateStep2(data));
        break;
      case 3:
        dispatch(updateStep3(data));
        break;
    }
  };

  const handleStepSubmit = (data: any) => {
    updateStepData(currentStepId, data);

    const nextStepId = getNextStepId(currentStepId);
    if (nextStepId) {
      dispatch(setCurrentStep(nextStepId));
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      handleFinalSubmit();
    }
  };

  const handlePrevious = () => {
    const prevStepId = getPreviousStepId(currentStepId);
    if (prevStepId) {
      dispatch(setCurrentStep(prevStepId));
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleFinalSubmit = async () => {
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));

    console.log("Final Form Submission:", {
      step1: formData.step1,
      step2: formData.step2,
      step3: formData.step3,
      submittedAt: new Date().toISOString(),
    });

    setIsSubmitting(false);
    setShowSuccess(true);
  };

  const handleReset = () => {
    dispatch(resetForm());
    setShowSuccess(false);
  };

  if (showSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full mx-4">
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Application Submitted!
            </h2>
            <p className="text-gray-600 mb-6">
              Thank you for your vendor application.
            </p>
            <div className="bg-gray-50 rounded-md p-4 mb-6 text-left">
              <h3 className="font-medium text-gray-900 mb-2">
                Submission Summary:
              </h3>
              <pre className="text-xs text-gray-600 overflow-auto max-h-60">
                {JSON.stringify(
                  {
                    step1: formData.step1,
                    step2: formData.step2,
                    step3: formData.step3,
                  },
                  null,
                  2,
                )}
              </pre>
            </div>
            <button
              onClick={handleReset}
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Start New Application
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!CurrentStepComponent) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <p className="text-red-500">Step not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Vendor Onboarding
          </h1>
          <p className="text-gray-600 mt-2">
            Please fill out all the required information
          </p>
        </div>

        <ProgressBar
          currentStep={currentStepId}
          steps={stepsConfig.map((step) => ({
            id: step.id,
            title: step.title,
            description: step.description,
          }))}
        />

        <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
          <CurrentStepComponent
            onSubmit={handleStepSubmit}
            onPrevious={handlePrevious}
            defaultValues={getCurrentStepData()}
            isSubmitting={isSubmitting}
          />
        </div>

        <div className="text-center mt-4 text-sm text-gray-500">
          Step {currentStepId} of {stepsConfig.length}
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
