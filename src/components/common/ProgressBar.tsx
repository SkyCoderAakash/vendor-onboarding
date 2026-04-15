import React, { memo } from "react";
import { stepsConfig } from "../../config/steps.config";

interface ProgressBarProps {
  currentStep: number;
  steps: {
    id: number;
    title: string;
    description: string;
  }[];
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  currentStep,
  steps = stepsConfig,
}) => {
  const progress = (currentStep / steps.length) * 100;

  return (
    <div className="mb-8">
      <div className="flex justify-between mb-2">
        {steps.map((step) => (
          <div key={step.id} className="flex-1 text-center">
            <div
              className={`
                w-8 h-8 rounded-full flex items-center justify-center mx-auto mb-2 transition-all duration-300
                ${
                  currentStep >= step.id
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-600"
                }
              `}
            >
              {step.id}
            </div>
            <div className="text-sm font-medium hidden sm:block">
              {step.title}
            </div>
            <div className="text-xs text-gray-500 hidden sm:block">
              {step.description}
            </div>
          </div>
        ))}
      </div>
      <div className="relative pt-1">
        <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-200">
          <div
            style={{ width: `${progress}%` }}
            className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-600 transition-all duration-500"
          />
        </div>
      </div>
    </div>
  );
};

export default memo(ProgressBar);
