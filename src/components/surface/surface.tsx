import clsx from "clsx";
import "./surface.scss";
import type { TSurfaceProps } from "./surface.types";

export const Surface = (props: TSurfaceProps) => {
  const { children, className } = props;
  return <div className={clsx("surface", className)}>{children}</div>;
};
