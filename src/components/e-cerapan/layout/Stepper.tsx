import React from 'react';

interface StepperProps {
  steps: string[];
  currentStep: number; // 0-indexed
  stepStatus?: 'in-progress' | 'completed'; // Controls the state of the active step
}

export default function Stepper({ steps, currentStep, stepStatus = 'in-progress' }: StepperProps) {
  return (
    <div className="flex items-center justify-center gap-0 mb-10">
      {steps.map((step, index) => {
        const isPast = index < currentStep;
        const isCurrent = index === currentStep;

        // 1. Finished: It's a past step OR it's the current step but marked as completed
        const isFinished = isPast || (isCurrent && stepStatus === 'completed');

        // 2. In Progress: It's the current step and hasn't been completed yet
        const isInProgress = isCurrent && stepStatus !== 'completed';

        const isLast = index === steps.length - 1;

        return (
          <React.Fragment key={index}>
            <div className="flex flex-col items-center gap-2 min-w-[120px]">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center text-[14px] font-semibold border-2 transition-colors ${isFinished || isInProgress
                    ? 'bg-[#2479BC] border-[#2479BC] text-white'
                    : 'bg-white border-gray-300 text-gray-400'
                  }`}
              >
                {isFinished ? (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  // Adds the leading zero to match Figma (e.g., 01, 02, 03)
                  String(index + 1).padStart(2, '0')
                )}
              </div>
              <span
                className={`text-[13px] text-center leading-tight ${isFinished || isInProgress ? 'text-[#2479BC] font-medium' : 'text-gray-400 font-normal'
                  }`}
              >
                {step}
              </span>
            </div>

            {!isLast && (
              <div
                className={`h-[2px] w-16 mt-[-24px] ${
                  // The line is blue ONLY if we have moved past this step
                  isPast ? 'bg-[#2479BC]' : 'bg-gray-300'
                  }`}
              />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}