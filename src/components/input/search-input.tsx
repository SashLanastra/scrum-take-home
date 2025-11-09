import SearchIcon from "@mui/icons-material/Search";
import { InputAdornment } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { Input } from "./input";

type TSearchInputProps = {
  onSearch: (searchTerm: string) => void;
  placeholder?: string;
  debounceMs?: number;
};

export const SearchInput = ({
  onSearch,
  placeholder = "Search...",
  debounceMs = 500,
}: TSearchInputProps) => {
  const [localValue, setLocalValue] = useState("");

  // Debounce the search callback
  useEffect(() => {
    const handler = setTimeout(() => {
      onSearch(localValue);
    }, debounceMs);

    return () => {
      clearTimeout(handler);
    };
  }, [localValue, debounceMs, onSearch]);

  const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setLocalValue(event.target.value);
  }, []);

  return (
    <Input
      label=""
      variant="outlined"
      value={localValue}
      placeholder={placeholder}
      disabled={false}
      fullWidth={true}
      type="search"
      onChange={handleChange}
      onBlur={() => {}}
      onFocus={() => {}}
      onKeyDown={() => {}}
      onKeyUp={() => {}}
      startAdornment={
        <InputAdornment position="start">
          <SearchIcon />
        </InputAdornment>
      }
      endAdornment={null}
      size="small"
      onKeyPress={() => {}}
    />
  );
};
