"use no memo";

import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import type { TCustomButtonProps } from "./custom-button.types";

const StyledButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== "customVariant" && prop !== "customSize",
})<TCustomButtonProps>(({ theme, customVariant = "fill", customSize = "medium", fullWidth }) => {
  const variants = {
    fill: {
      backgroundColor: "#14b8a6",
      border: "2px solid #14b8a6",
      color: "#ffffff",
      "&:hover": {
        backgroundColor: "#0d9488",
        border: "2px solid #0d9488",
        color: "#ffffff",
      },
    },
    outline: {
      backgroundColor: "transparent",
      border: "2px solid #14b8a6",
      color: "#14b8a6",
      "&:hover": {
        backgroundColor: "#14b8a6",
        border: "2px solid #14b8a6",
        color: "#ffffff",
      },
    },
    pop: {
      backgroundColor: "transparent",
      border: "2px solid #FFB018",
      color: "#FFB018",
      "&:hover": {
        backgroundColor: "#FFDE68",
        border: "2px solid #FFB018",
        color: "#000000",
      },
    },
  };

  const sizes = {
    small: {
      padding: "10px 16px",
      fontSize: "0.813rem",
    },
    medium: {
      padding: "13px 16px",
      fontSize: "1rem",
    },
    large: {
      padding: "16px 16px",
      fontSize: "1.050rem",
    },
  };
  const effectiveSize = customSize === "large" ? "large" : customSize;

  return {
    ...variants[customVariant],
    ...sizes.small,
    [theme.breakpoints.up("md")]: {
      ...(effectiveSize === "large" ? sizes.large : sizes.medium),
    },
    width: fullWidth ? "100%" : "auto",
    borderRadius: "12px",
    textTransform: "none",
    fontWeight: 400,
    lineHeight: "0",
    transition: "all 0.2s ease-in-out",
    boxShadow: "none",
    "&:hover": {
      ...variants[customVariant]["&:hover"],
      boxShadow: "none",
    },
    display: "flex",
    alignItems: "center",
    gap: "16px",
  };
});

export const CustomButton = (props: TCustomButtonProps) => {
  return (
    <StyledButton {...props}>
      {props.icon && <div className="button-icon">{props.icon}</div>}
      {props.children}
    </StyledButton>
  );
};
