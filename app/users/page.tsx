"use client";

import { signOut } from "next-auth/react";
import Button from "../components/Button";

const Users = () => {
  return (
    <div className="flex flex-col justify-center items-center h-full">
      <Button
        type="submit"
        //   fullWidth
        isLoading={false}
        onClick={() => {
          signOut();
        }}
      >
        logout
      </Button>
    </div>
  );
};

export default Users;
