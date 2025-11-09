import { styled, Tooltip, type TooltipProps } from "@mui/material";
import type { TStyledTooltipProps } from "./styled-tooltip.types";

const CustomTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  "& .MuiTooltip-tooltip": {
    backgroundColor: theme.palette.grey[900],
    color: theme.palette.common.white,
    fontSize: 12,
    borderRadius: 6,
    padding: "6px 12px",
    maxWidth: 220,
  },
  "& .MuiTooltip-arrow": {
    color: theme.palette.grey[900],
  },
}));

export const StyledTooltip = (props: TStyledTooltipProps) => {
  const { children, title, placement = "top" } = props;
  return (
    <CustomTooltip title={title} placement={placement} arrow>
      {children}
    </CustomTooltip>
  );
};
