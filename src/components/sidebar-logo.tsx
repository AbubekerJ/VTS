import Image from "next/image";
import React from "react";

const SidebarLogo = () => {
  return (
    <>
      <div className="flex gap-2 items-center">
        <div className=" ">
          <Image src="/et-logo.png" alt="Ethiotelecom" width={30} height={30} />
        </div>
        <div className="grid flex-1 text-left text-sm leading-tight">
          <span className="truncate font-semibold">EthioTelecom</span>
        </div>
      </div>
    </>
  );
};

export default SidebarLogo;
