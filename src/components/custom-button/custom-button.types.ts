import type { ButtonProps } from "@mui/material";

export type CustomButtonVariant = "outline" | "fill" | "pop";
export type CustomButtonSize = "small" | "medium" | "large";

export type TCustomButtonProps = Omit<ButtonProps, "variant" | "size"> & {
  customVariant?: CustomButtonVariant;
  customSize?: CustomButtonSize;
  fullWidth?: boolean;
  icon?: React.ReactNode;
};
