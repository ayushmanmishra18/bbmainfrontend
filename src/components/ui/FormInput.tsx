// src/components/ui/FormInput.tsx
"use client";
import React, { ChangeEvent } from "react";

type FormInputProps = {
  id: string;
  name: string;
  label: string;
  value: string | number;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  required?: boolean;
  disabled?: boolean;
  placeholder?: string;
  className?: string;
};

const FormInput = ({
  id,
  name,
  label,
  value,
  onChange,
  type = "text",
  required = false,
  disabled = false,
  placeholder = "",
  className = "",
}: FormInputProps) => {
  const labelClasses =
    "block text-sm font-medium mb-1 text-content dark:text-gray-300";
  const inputClasses =
    "w-full px-3 py-2 bg-subtle border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 disabled:bg-gray-200 dark:disabled:bg-gray-800 disabled:cursor-not-allowed";

  return (
    <div className={className}>
      <label htmlFor={id} className={labelClasses}>
        {label}
      </label>
      <input
        type={type}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        className={`mt-1 ${inputClasses}`}
        required={required}
        disabled={disabled}
        placeholder={placeholder}
      />
    </div>
  );
};

export default FormInput;
