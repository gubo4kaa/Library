import LibraryTopbar from "@/shared/ui/topbar/LibraryTopbar";
import { DetailedHTMLProps, HTMLAttributes } from "react";

interface Props
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  category: ICategory[];
}

const Header = ({ category, className }: Props) => {
  return <LibraryTopbar category={category} className={className} />;
};

export default Header;
