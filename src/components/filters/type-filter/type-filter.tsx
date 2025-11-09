import { Close } from "@mui/icons-material";
import { useMemo, useState } from "react";
import { EType, type EType as ETypeType } from "../../../api/assets";
import { useFilterContext } from "../../../context/providers/assets-provider";
import { CustomBadge } from "../../badges/custom-badge";
import { typeColors } from "../../badges/helpers";
import { CheckBox } from "../../checkbox/checkbox";
import { ItemPicker } from "../../item-picker/item-picker";
import type { TTypeFilterProps } from "./type-filter.types";

type TTypeItem = {
  id: string;
  name: string;
};

export const TypeFilter = ({
  placeholder = "Filter by type...",
  title = "Filter by type",
}: TTypeFilterProps) => {
  const { filters, updateFilters } = useFilterContext();
  const [selectedTypes, setSelectedTypes] = useState<ETypeType[]>(filters.types);

  // Use static enum values instead of deriving from assets
  const availableOptions = useMemo(() => {
    return Object.values(EType).map((type) => ({
      id: type,
      name: type,
    }));
  }, []);

  // Convert selected types to items
  const selectedItems = useMemo(() => {
    return selectedTypes.map((type) => ({
      id: type,
      name: type,
    }));
  }, [selectedTypes]);

  // Update both local state and context
  const updateSelection = (newTypes: EType[]) => {
    setSelectedTypes(newTypes);
    updateFilters("types", newTypes);
  };

  // Handle toggling a type
  const handleToggle = (item: TTypeItem) => {
    const type = item.id as EType;
    const newTypes = selectedTypes.includes(type)
      ? selectedTypes.filter((t) => t !== type)
      : [...selectedTypes, type];
    updateSelection(newTypes);
  };

  // Handle removing a type
  const handleRemove = (item: TTypeItem) => {
    const type = item.id as EType;
    const newTypes = selectedTypes.filter((t) => t !== type);
    updateSelection(newTypes);
  };

  // Handle reset - clear all selected types
  const handleReset = () => {
    updateSelection([]);
  };

  // Handle select all - select all available types
  const handleSelectAll = () => {
    const allTypes = Object.values(EType);
    updateSelection(allTypes);
  };

  // Check if a type is selected
  const isSelected = (itemId: string) => {
    return selectedTypes.includes(itemId as EType);
  };

  return (
    <ItemPicker<TTypeItem>
      selectedItems={selectedItems}
      selectItemKey="id"
      placeholder={placeholder}
      selectedItemRender={{
        labelKey: "name",
        removeSelectedItem: handleRemove,
        renderChip: (item, removeSelectedItem) => (
          <CustomBadge
            backgroundColor={typeColors[item.id as EType].backgroundColor}
            color={typeColors[item.id as EType].color}
            text={typeColors[item.id as EType].text}
            icon={typeColors[item.id as EType].icon}
            deleteIcon={<Close sx={{ width: 12, height: 12, color: "inherit" }} />}
            onDelete={(e: React.MouseEvent<HTMLButtonElement>) => {
              e.stopPropagation();
              removeSelectedItem(item);
            }}
          />
        ),
      }}
      popover={{
        title: title,
        listData: availableOptions,
        toggleSelectedItem: handleToggle,
        resetSelectedItems: handleReset,
        selectAllItems: handleSelectAll,
        allButtonText: "All",
        resetButtonText: "None",
        listItemRender: {
          labelKey: "name",
          nodeRender: (item) => (
            <CheckBox
              checked={isSelected(item.id)}
              onCheckedChange={() => handleToggle(item)}
              label={
                <CustomBadge
                  backgroundColor={typeColors[item.id as EType].backgroundColor}
                  color={typeColors[item.id as EType].color}
                  text={typeColors[item.id as EType].text}
                  icon={typeColors[item.id as EType].icon}
                />
              }
            />
          ),
        },
      }}
    />
  );
};
