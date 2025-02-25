import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Separator } from "./ui/separator";

const PageWrapper = ({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) => {
  return (
    <div>
      <Card className="mx-auto w-[90%] mt-5">
        <CardHeader className="gap-4">
          <CardTitle>{title}</CardTitle>
          <CardDescription className="">{description}</CardDescription>
        </CardHeader>
        <Separator className="my-4" />
        <CardContent>{children}</CardContent>
      </Card>
    </div>
  );
};

export default PageWrapper;
