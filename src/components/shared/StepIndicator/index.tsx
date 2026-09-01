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
  activeColor = "bg-[#040404]",
  inactiveColor = "bg-[#D9D9D9]",
  className = "",
  variant = "progress",
}) => {
  return (
    <div className={`flex items-center gap-4 ${className}`}>
      {Array.from({ length: totalSteps }).map((_, index) => {
        const stepNum = index + 1;
        const isActive =
          variant === "progress"
            ? stepNum <= currentStep
            : stepNum === currentStep;
        return (
          <div
            key={index}
            className={`w-5 h-2 rounded-full transition-all duration-300 ${
              isActive ? activeColor : inactiveColor
            }`}
          />
        );
      })}
    </div>
  );
};

export default StepIndicator;
