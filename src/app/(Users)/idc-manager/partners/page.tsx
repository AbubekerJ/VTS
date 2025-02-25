import React from "react";
import PartnerController from "./components/partner-controller";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const Partners = () => {
  return (
    <div>
      <Card className="mx-auto w-[90%] mt-5">
        <CardHeader className="gap-4">
          <CardTitle>Partners</CardTitle>
          <CardDescription className="">
            List of partners in your region.
          </CardDescription>
        </CardHeader>
        <Separator className="my-4" />
        <CardContent>
          {" "}
          <PartnerController />
        </CardContent>
      </Card>
    </div>
  );
};

export default Partners;
