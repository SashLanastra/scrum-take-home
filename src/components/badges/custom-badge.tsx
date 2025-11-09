import { IconButton } from "@mui/material";
import type { MouseEvent, ReactNode } from "react";

export const CustomBadge = ({
  deleteIcon,
  onDelete,
  backgroundColor,
  color,
  text,
  icon,
}: {
  deleteIcon?: ReactNode;
  onDelete?: (e: MouseEvent<HTMLButtonElement>) => void;
  backgroundColor?: string;
  color?: string;
  text?: string;
  icon?: ReactNode;
}) => {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: backgroundColor ?? "CCCCCC",
        color: color ?? "FFFFFF",
        padding: "4px 12px",
        borderRadius: "16px",
        fontSize: "0.8125rem",
        fontWeight: 500,
        lineHeight: "1.5",
        whiteSpace: "nowrap",
        gap: "4px",
      }}
    >
      {text && text}
      {icon && icon}
      {deleteIcon && (
        <IconButton size="small" onClick={onDelete}>
          {deleteIcon}
        </IconButton>
      )}
    </span>
  );
};
