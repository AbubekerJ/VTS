import Image from "next/image";

import UserAuthForm from "./Component/user-auth-fom";

export default function AuthenticationPage() {
  return (
    <>
      <div className="md:hidden">
        {/* <Image
          src="/examples/authentication-light.png"
          width={1280}
          height={843}
          alt="Authentication"
          className="block dark:hidden"
        />
        <Image
          src="/examples/authentication-dark.png"
          width={1280}
          height={843}
          alt="Authentication"
          className="hidden dark:block"
        /> */}
      </div>
      <div className="container relative px-6 lg:h-[970px]  flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <div className="relative hidden h-full  flex-col bg-muted p-10 text-white dark:border-r lg:flex">
          <div className="absolute inset-0 bg-zinc-400" />
          <div className="relative z-20 flex items-center text-lg font-medium space-x-3">
            <Image src={"/et-logo.png"} width={50} height={50} alt="logo" />
            EthioTelecom
          </div>
        </div>

        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">LogIn</h1>
              <p className="text-sm text-muted-foreground">
                Enter your email and password to login
              </p>
            </div>
            <UserAuthForm />
          </div>
        </div>
      </div>
    </>
  );
}
