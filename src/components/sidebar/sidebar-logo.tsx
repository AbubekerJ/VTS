import Image from "next/image";
import React from "react";

const SidebarLogo = () => {
  return (
    <>
      <div className="flex gap-2 items-center">
        <div className=" ">
          <Image
            src="/et-logo-text.png"
            alt="Ethiotelecom"
            width={170}
            height={170}
          />
        </div>
      </div>
    </>
  );
};

export default SidebarLogo;
