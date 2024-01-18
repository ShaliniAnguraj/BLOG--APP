import React from "react";
import { PiSmileySadBold } from "react-icons/pi";
const Error = () => {
  return (
    <div>
      <div class="font-semibold relative m-4 flex rounded-lg bg-red-500 p-4 text-2xl justify-center items-center text-white opacity-100">
        Oops! something Went Wrong <PiSmileySadBold />
      </div>
    </div>
  );
};

export default Error;
