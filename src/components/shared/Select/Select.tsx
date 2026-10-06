"use client";

import React, { forwardRef } from "react";
import { FormikProps } from "formik";
import { AlertCircle, ChevronDown } from "lucide-react";

export interface SelectOption {
  value: string | number;
  label: string;
  disabled?: boolean;
}

export interface SelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  name: string;
  label?: string;
  formik?: FormikProps<any>;
  options?: SelectOption[];
  placeholder?: string;
  error?: string;
  helperText?: string;
  icon?: React.ReactNode;
  containerClassName?: string;
  labelClassName?: string;
  required?: boolean;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      name,
      label,
      formik,
      options,
      placeholder,
      error,
      helperText,
      icon,
      className = "",
      containerClassName = "",
      labelClassName = "",
      required,
      id,
      value,
      onChange,
      onBlur,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const selectId = id || `select-${name}`;

    const formikValue = formik ? formik.values[name] ?? "" : undefined;
    const selectValue = value !== undefined ? value : formikValue !== undefined ? formikValue : "";

    const formikTouched = formik ? Boolean(formik.touched[name]) : false;
    const formikError = formik && formikTouched ? (formik.errors[name] as string | undefined) : undefined;
    const errorMessage = error || formikError;
    const hasError = Boolean(errorMessage);

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      if (onChange) {
        onChange(e);
      }
      if (formik) {
        formik.handleChange(e);
      }
    };

    const handleBlur = (e: React.FocusEvent<HTMLSelectElement>) => {
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
            htmlFor={selectId}
            className={`text-xs font-semibold text-slate-700 dark:text-gray-300 uppercase tracking-wider block ${labelClassName}`}
          >
            {label} {required && <span className="text-teal-600 dark:text-teal-400">*</span>}
          </label>
        )}

        <div className="relative flex items-center">
          {icon && (
            <div className="absolute left-3.5 flex items-center justify-center text-slate-400 dark:text-gray-400 pointer-events-none">
              {icon}
            </div>
          )}

          <select
            ref={ref}
            id={selectId}
            name={name}
            value={selectValue}
            onChange={handleChange}
            onBlur={handleBlur}
            disabled={disabled}
            aria-invalid={hasError}
            aria-describedby={hasError ? `${selectId}-error` : undefined}
            className={`w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-900 border text-slate-900 dark:text-white text-sm focus:outline-none transition-all duration-200 shadow-xs appearance-none pr-10 cursor-pointer ${
              icon ? "pl-10" : ""
            } ${
              hasError
                ? "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500/20"
                : "border-slate-300 dark:border-white/10 focus:border-teal-500 focus:ring-1 focus:ring-teal-500/20"
            } ${disabled ? "opacity-60 cursor-not-allowed bg-slate-100 dark:bg-white/5" : ""} ${className}`}
            {...props}
          >
            {placeholder && (
              <option value="" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">
                {placeholder}
              </option>
            )}

            {options
              ? options.map((opt) => (
                  <option
                    key={opt.value}
                    value={opt.value}
                    disabled={opt.disabled}
                    className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                  >
                    {opt.label}
                  </option>
                ))
              : children}
          </select>

          <div className="absolute right-3.5 flex items-center justify-center text-slate-400 dark:text-gray-400 pointer-events-none">
            <ChevronDown className="w-4 h-4" />
          </div>
        </div>

        {hasError && (
          <div
            id={`${selectId}-error`}
            className="flex items-center gap-1 text-xs text-red-500 dark:text-red-400 mt-1 animate-in fade-in duration-150"
          >
            <AlertCircle className="w-3.5 h-3.5 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {helperText && !hasError && (
          <p className="text-xs-plus text-slate-500 dark:text-gray-400 mt-1">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Select.displayName = "Select";

export default Select;
