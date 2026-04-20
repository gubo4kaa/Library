"use client";
import cn from "classnames";
import {
  ButtonHTMLAttributes,
  HTMLAttributes,
  MouseEvent,
  ReactElement,
} from "react";
import styles from "./ButtonNew.module.css";

interface Props extends HTMLAttributes<HTMLElement> {
  href?: string;
  disable?: boolean;
  type?:
    | "LinkGhost"
    | "Primary"
    | "Default Ghost"
    | "Default Primary"
    | "Secondary Ghost";
  size?: "es" | "s" | "m";
  iconPosition?: "icon" | "iconLeft" | "iconRight" | null;
  width?: "max" | "min";
  preventDefault?: false | true;
  target?: boolean;
}

export default function ButtonNew({
  type = "Primary",
  disable = false,
  iconPosition = null,
  width = "min",
  preventDefault = false,
  className,
  href,
  size = "m",
  target,
  children,
  onClick,
  ...props
}: Props): ReactElement {
  const buttonClassName = cn(
    styles.button,
    {
      [styles.sizeEs]: size === "es",
      [styles.sizeS]: size === "s",
      [styles.sizeM]: size === "m",
      [styles.iconLeft]: iconPosition === "iconLeft",
      [styles.iconRight]: iconPosition === "iconRight",
      [styles.icon]: iconPosition === "icon",
      [styles.maxWidth]: width === "max",
      [styles.primary]: type === "Primary",
      [styles.linkGhost]: type === "LinkGhost",
      [styles.secondaryGhost]: type === "Secondary Ghost",
      [styles.defaultGhost]: type === "Default Ghost",
      [styles.defaultPrimary]: type === "Default Primary",
      [styles.disable]: disable === true,
    },
    className,
  );

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    if (disable) {
      event.preventDefault();
      return;
    }

    if (preventDefault) {
      event.preventDefault();
    }

    onClick?.(event);
  };

  if (href) {
    return (
      <a
        href={href}
        onClick={handleClick}
        className={buttonClassName}
        target={target ? "_blank" : undefined}
        aria-disabled={disable}
        {...props}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      type="button"
      onClick={handleClick as ButtonHTMLAttributes<HTMLButtonElement>["onClick"]}
      className={buttonClassName}
      disabled={disable}
      {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {children}
    </button>
  );
}
