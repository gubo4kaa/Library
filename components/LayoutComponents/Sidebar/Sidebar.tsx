import LibrarySidebar from "@/shared/ui/sidebar/LibrarySidebar";
import { DetailedHTMLProps, HTMLAttributes } from "react";

interface Props
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  categories: ICategory[];
}

const Sidebar = ({ categories, className }: Props) => {
  return <LibrarySidebar categories={categories} className={className} />;
};

export default Sidebar;
