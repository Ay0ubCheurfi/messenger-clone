"use client";

import clsx from "clsx";
import { IconType } from "react-icons";

interface AuthSocialButtonProps {
  icon: IconType;
  disabled?: boolean;
  onClick: () => void;
}

const AuthSocialButton: React.FC<AuthSocialButtonProps> = ({
  icon: Icon,
  disabled,
  onClick,
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={clsx(
        ` inline-flex
    w-full
    justify-center
    px-4
      py-2.5
    rounded-md
    bg-white
    text-gray-500  
    
    ring-1
    ring-inset
    ring-gray-300
    hover:bg-gray-50
    focus:outline-offset-0
    hover:shadow-lg
    hover:-translate-y-[.8px]
    transition ease-in-out duration-200`,
        disabled && "opacity-50 cursor-default"
      )}
    >
      <Icon />
    </button>
  );
};

export default AuthSocialButton;
