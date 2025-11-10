import type { CheckboxProps } from "@mui/material";
import { FormControlLabel, Checkbox as MuiCheckbox } from "@mui/material";
import type { ReactNode } from "react";

type TCheckboxProps = Omit<CheckboxProps, "onChange"> & {
  label?: ReactNode;
  onCheckedChange?: (checked: boolean) => void;
};

export const CheckBox = ({ label, onCheckedChange, checked, ...props }: TCheckboxProps) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.stopPropagation();
    onCheckedChange?.(event.target.checked);
  };

  const handleClick = (event: React.MouseEvent) => {
    event.stopPropagation();
  };

  if (label) {
    return (
      <FormControlLabel
        control={<MuiCheckbox checked={checked} onChange={handleChange} {...props} />}
        label={label}
        onClick={handleClick}
      />
    );
  }

  return <MuiCheckbox checked={checked} onChange={handleChange} {...props} />;
};
