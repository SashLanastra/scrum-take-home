import type { TooltipProps } from "@mui/material";

export type TStyledTooltipProps = {
  children: React.ReactElement;
  title: React.ReactNode;
  placement?: TooltipProps["placement"];
};
