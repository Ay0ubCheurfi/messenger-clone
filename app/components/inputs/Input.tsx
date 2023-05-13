"use client";

import clsx from "clsx";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

interface InputProps {
  id: string;
  label: string;
  type?: string;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
  disabled?: boolean;
}

const Input: React.FC<InputProps> = ({
  id,
  label,
  type = "text",
  register,
  errors,
  required,
  disabled,
}) => {
  return (
    <div>
      <label
        htmlFor={id}
        className="
    block
    text-sm
    font-medium
    leading-6
    pl-1
    text-gray-900
    "
      >
        {label}
      </label>
      <div className="mt-2">
        <input
          id={id}
          type={type}
          autoComplete={id}
          disabled={disabled}
          placeholder={label}
          {...register(id, { required })}
          className={clsx(
            `
          form-input
          block
          w-full
          rounded-md
          border-0
          py-2.5
          text-gray-900
          ring-1
          ring-inset
          ring-gray-300
          placeholder:text-gray-400
          focus:ring-1
          focus:ring-inset
          focus:ring-sky-500
          text-sm
          sm:text-sm
          sm:marker:leading-6
          `,
            errors[id] && "focus:ring-rose-500",
            disabled && "opacity-50 cursor-default"
          )}
        />
      </div>
    </div>
  );
};

export default Input;
