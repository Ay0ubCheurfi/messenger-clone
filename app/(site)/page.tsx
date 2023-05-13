import Image from "next/image";
import AuthForm from "./components/AuthForm";

export default function Home() {
  return (
    <div
      className="
      flex
      flex-col
      min-h-full
      justify-center
      py-12
      sm:px-6
      lg:px-8
      bg-gradient-to-tr from-blue-200  via-blue-50 to-white 
      "
    >
      <div
        className="
          sm:mx-auto
          sm:w-full
          sm:max-w-md
          "
      >
        <Image
          alt="logo"
          height="48"
          width="48"
          src="/images/logo.png"
          className="
          mx-auto
          w-auto
      hover:-translate-y-3
      hover:scale-125
      transition ease-in-out duration-200
          "
        />
        <h2
          className="
              mt-6
              text-center
              text-2xl
              sm:text-3xl
              font-bold
              tracking-tight
              text-gray-900
        "
        >
          Sign in to your account
        </h2>
      </div>
      <AuthForm />
    </div>
  );
}
