"use client";

import React, { forwardRef } from "react";
import { FormikProps } from "formik";
import { AlertCircle } from "lucide-react";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
  formik?: FormikProps<any>;
  error?: string;
  helperText?: string;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  containerClassName?: string;
  labelClassName?: string;
  required?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      name,
      label,
      formik,
      error,
      helperText,
      icon,
      iconPosition = "left",
      className = "",
      containerClassName = "",
      labelClassName = "",
      type = "text",
      required,
      id,
      value,
      onChange,
      onBlur,
      disabled,
      ...props
    },
    ref
  ) => {
    const inputId = id || `input-${name}`;

    const formikValue = formik ? formik.values[name] ?? "" : undefined;
    const inputValue = value !== undefined ? value : formikValue !== undefined ? formikValue : "";

    const formikTouched = formik ? Boolean(formik.touched[name]) : false;
    const formikError = formik && formikTouched ? (formik.errors[name] as string | undefined) : undefined;
    const errorMessage = error || formikError;
    const hasError = Boolean(errorMessage);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (onChange) {
        onChange(e);
      }
      if (formik) {
        formik.handleChange(e);
      }
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      if (onBlur) {
        onBlur(e);
      }
      if (formik) {
        formik.handleBlur(e);
      }
    };

    return (
      <div className={`w-full space-y-1.5 ${containerClassName}`}>
        {label && (
          <label
            htmlFor={inputId}
            className={`text-xs font-semibold text-slate-700 dark:text-gray-300 uppercase tracking-wider block ${labelClassName}`}
          >
            {label} {required && <span className="text-teal-600 dark:text-teal-400">*</span>}
          </label>
        )}

        <div className="relative flex items-center">
          {icon && iconPosition === "left" && (
            <div className="absolute left-3.5 flex items-center justify-center text-slate-400 dark:text-gray-400 pointer-events-none">
              {icon}
            </div>
          )}

          <input
            ref={ref}
            id={inputId}
            name={name}
            type={type}
            value={inputValue}
            onChange={handleChange}
            onBlur={handleBlur}
            disabled={disabled}
            aria-invalid={hasError}
            aria-describedby={hasError ? `${inputId}-error` : undefined}
            className={`w-full px-4 py-3 rounded-xl bg-white dark:bg-black/40 border text-slate-900 dark:text-white text-sm focus:outline-none transition-all duration-200 placeholder:text-slate-400 dark:placeholder:text-gray-500 shadow-xs ${
              icon && iconPosition === "left" ? "pl-10" : ""
            } ${icon && iconPosition === "right" ? "pr-10" : ""} ${
              hasError
                ? "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500/20"
                : "border-slate-300 dark:border-white/10 focus:border-teal-500 focus:ring-1 focus:ring-teal-500/20"
            } ${disabled ? "opacity-60 cursor-not-allowed bg-slate-100 dark:bg-white/5" : ""} ${className}`}
            {...props}
          />

          {icon && iconPosition === "right" && (
            <div className="absolute right-3.5 flex items-center justify-center text-slate-400 dark:text-gray-400 pointer-events-none">
              {icon}
            </div>
          )}
        </div>

        {hasError && (
          <div
            id={`${inputId}-error`}
            className="flex items-center gap-1 text-xs text-red-500 dark:text-red-400 mt-1 animate-in fade-in duration-150"
          >
            <AlertCircle className="w-3.5 h-3.5 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {helperText && !hasError && (
          <p className="text-[11px] text-slate-500 dark:text-gray-400 mt-1">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
