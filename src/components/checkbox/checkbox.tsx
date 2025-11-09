import type { CheckboxProps } from "@mui/material";
import { FormControlLabel, Checkbox as MuiCheckbox } from "@mui/material";
import type { ReactNode } from "react";

type TCheckboxProps = Omit<CheckboxProps, "onChange"> & {
  label?: ReactNode;
  onCheckedChange?: (checked: boolean) => void;
};

export const CheckBox = ({ label, onCheckedChange, checked, ...props }: TCheckboxProps) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onCheckedChange?.(event.target.checked);
  };

  if (label) {
    return (
      <FormControlLabel
        control={<MuiCheckbox checked={checked} onChange={handleChange} {...props} />}
        label={label}
      />
    );
  }

  return <MuiCheckbox checked={checked} onChange={handleChange} {...props} />;
};
