import LibrarySidebar from "@/shared/ui/sidebar/LibrarySidebar";
import { DetailedHTMLProps, HTMLAttributes } from "react";

interface Props
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  categories: ICategory[];
  mobile?: boolean;
}

const Sidebar = ({ categories, className, mobile = false }: Props) => {
  return (
    <LibrarySidebar
      categories={categories}
      className={className}
      mobile={mobile}
    />
  );
};

export default Sidebar;
