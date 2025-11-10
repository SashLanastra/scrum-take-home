import { IconButton } from "@mui/material";
import type { MouseEvent, ReactNode } from "react";
import "./custom-badge.scss";

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
      className="custom-badge"
      style={{
        backgroundColor: backgroundColor ?? "CCCCCC",
        color: color ?? "FFFFFF",
      }}
    >
      {text && <span>{text}</span>}
      {icon && <span>{icon}</span>}
      {deleteIcon && (
        <IconButton
          size="small"
          onClick={(e) => {
            e.stopPropagation();
            onDelete?.(e);
          }}
        >
          {deleteIcon}
        </IconButton>
      )}
    </span>
  );
};
