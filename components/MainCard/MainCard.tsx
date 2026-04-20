import ResourceCard from "@/shared/ui/resource-card/ResourceCard";
import { DetailedHTMLProps, HTMLAttributes } from "react";

interface Props extends DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> {
  service: IServiceInterface;
  categories: ICategory[];
  eager?: boolean;
}

export default function MainCard({
  categories,
  service,
  eager = false,
}: Props) {
  return <ResourceCard service={service} categories={categories} eager={eager} />;
}
