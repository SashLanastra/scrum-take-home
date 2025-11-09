import { TextField } from "@mui/material";
import type { TInputProps } from "./input.types";
export const Input = (props: TInputProps) => {
  const {
    label,
    variant,
    value,
    placeholder,
    disabled,
    fullWidth,
    type,
    onChange,
    onBlur,
    onFocus,
    onKeyDown,
    onKeyUp,
    startAdornment,
    endAdornment,
    size,
  } = props;
  return (
    <TextField
      label={label}
      variant={variant}
      value={value}
      placeholder={placeholder}
      disabled={disabled}
      fullWidth={fullWidth}
      type={type}
      onChange={onChange}
      onBlur={onBlur}
      onFocus={onFocus}
      onKeyDown={onKeyDown}
      onKeyUp={onKeyUp}
      size={size}
      slotProps={{
        input: {
          startAdornment,
          endAdornment,
        },
      }}
    />
  );
};
