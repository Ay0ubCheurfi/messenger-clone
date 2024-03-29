"use client";

import clsx from "clsx";

interface ButtonProps {
  type?: "button" | "submit" | "reset" | undefined;
  fullWidth?: boolean;
  children?: React.ReactNode;
  onClick?: () => void;
  secondary?: boolean;
  danger?: boolean;
  disabled?: boolean;
  isLoading: boolean;
}

const Button: React.FC<ButtonProps> = ({
  type,
  fullWidth,
  children,
  onClick,
  secondary,
  danger,
  disabled,
  isLoading = false,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={clsx(
        `
          flex
          justify-center
          rounded-md
          px-3
          py-2.5
          text-sm
          font-semibold
          focus-visible:outline
          focus-visible:outline-2
          focus-visible:outline-offset-2
          transition ease-in-out duration-200

      `,
        disabled && "opacity-50 cursor-default",
        fullWidth && "w-full",
        secondary ? "text-gray-900" : "text-white",
        danger &&
          "bg-gradient-to-tr from-rose-500 to-rose-400 hover:-translate-y-[.8px] hover:shadow-lg hover:shadow-rose-100",
        !secondary &&
          !danger &&
          "bg-gradient-to-tr from-blue-500 to-blue-400 hover:-translate-y-[.8px] hover:shadow-lg hover:shadow-blue-100"
      )}
    >
      <>
        {isLoading ? (
          <svg
            className="animate-spin  h-5 w-5 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              stroke-width="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        ) : (
          children
        )}
      </>
    </button>
  );
};

export default Button;
