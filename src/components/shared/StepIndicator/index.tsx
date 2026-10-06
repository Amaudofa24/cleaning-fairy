import React from "react";

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
  activeColor?: string;
  inactiveColor?: string;
  className?: string;
  variant?: "progress" | "single";
}

const StepIndicator: React.FC<StepIndicatorProps> = ({
  currentStep,
  totalSteps,
  activeColor = "bg-teal-500 dark:bg-teal-400",
  inactiveColor = "bg-slate-200 dark:bg-white/10",
  className = "",
  variant = "progress",
}) => {
  return (
    <div className={`flex items-center gap-1.5 sm:gap-2.5 ${className}`}>
      {Array.from({ length: totalSteps }).map((_, index) => {
        const stepNum = index + 1;
        const isActive =
          variant === "progress"
            ? stepNum <= currentStep
            : stepNum === currentStep;
        return (
          <div
            key={index}
            className={`w-3.5 sm:w-5 h-1.5 sm:h-2 rounded-full transition-all duration-300 ${
              isActive ? activeColor : inactiveColor
            }`}
          />
        );
      })}
    </div>
  );
};

export default StepIndicator;
