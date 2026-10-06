"use client";

import React, { forwardRef } from "react";
import { FormikProps } from "formik";
import { AlertCircle } from "lucide-react";

export interface TextAreaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  name: string;
  label?: string;
  formik?: FormikProps<any>;
  error?: string;
  helperText?: string;
  containerClassName?: string;
  labelClassName?: string;
  required?: boolean;
}

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  (
    {
      name,
      label,
      formik,
      error,
      helperText,
      className = "",
      containerClassName = "",
      labelClassName = "",
      required,
      id,
      value,
      onChange,
      onBlur,
      disabled,
      rows = 3,
      ...props
    },
    ref
  ) => {
    const textareaId = id || `textarea-${name}`;

    const formikValue = formik ? formik.values[name] ?? "" : undefined;
    const textValue = value !== undefined ? value : formikValue !== undefined ? formikValue : "";

    const formikTouched = formik ? Boolean(formik.touched[name]) : false;
    const formikError = formik && formikTouched ? (formik.errors[name] as string | undefined) : undefined;
    const errorMessage = error || formikError;
    const hasError = Boolean(errorMessage);

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      if (onChange) {
        onChange(e);
      }
      if (formik) {
        formik.handleChange(e);
      }
    };

    const handleBlur = (e: React.FocusEvent<HTMLTextAreaElement>) => {
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
            htmlFor={textareaId}
            className={`text-xs font-semibold text-slate-700 dark:text-gray-300 uppercase tracking-wider block ${labelClassName}`}
          >
            {label} {required && <span className="text-teal-600 dark:text-teal-400">*</span>}
          </label>
        )}

        <textarea
          ref={ref}
          id={textareaId}
          name={name}
          rows={rows}
          value={textValue}
          onChange={handleChange}
          onBlur={handleBlur}
          disabled={disabled}
          aria-invalid={hasError}
          aria-describedby={hasError ? `${textareaId}-error` : undefined}
          className={`w-full px-4 py-3 rounded-xl bg-white dark:bg-black/40 border text-slate-900 dark:text-white text-sm focus:outline-none transition-all duration-200 placeholder:text-slate-400 dark:placeholder:text-gray-500 shadow-xs resize-none ${
            hasError
              ? "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500/20"
              : "border-slate-300 dark:border-white/10 focus:border-teal-500 focus:ring-1 focus:ring-teal-500/20"
          } ${disabled ? "opacity-60 cursor-not-allowed bg-slate-100 dark:bg-white/5" : ""} ${className}`}
          {...props}
        />

        {hasError && (
          <div
            id={`${textareaId}-error`}
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

TextArea.displayName = "TextArea";

export default TextArea;
