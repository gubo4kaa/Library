import { DetailedHTMLProps, HTMLAttributes, ReactElement } from "react";
import ButtonNew from "../ButtonNew/ButtonNew";

interface Props extends DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> {
  size?: "extraSmall" | "small" | "medium";
  color?: "whiteBlue" | "grey" | "blueWhite" | "whiteBlue";
  width?: "full" | null;
  height?: "full" | null;
  href?: string;
}

export default function Button({
  color = "blueWhite",
  href,
  size = "small",
  width = null,
  className,
  children,
}: Props): ReactElement {
  return (
    <ButtonNew
      href={href}
      className={className}
      size={size === "medium" ? "m" : "s"}
      width={width === "full" ? "max" : "min"}
      type={color === "blueWhite" ? "Primary" : "Default Primary"}
    >
      {children}
    </ButtonNew>
  );
}
