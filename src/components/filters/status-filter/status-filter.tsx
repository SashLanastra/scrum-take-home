import { Close } from "@mui/icons-material";
import { useMemo, useState } from "react";
import { EStatus, type EStatus as EStatusType } from "../../../api/assets";
import { useFilterContext } from "../../../context/providers/assets-provider";
import { CustomBadge } from "../../badges/custom-badge";
import { statusColors } from "../../badges/helpers";
import { CheckBox } from "../../checkbox/checkbox";
import { ItemPicker } from "../../item-picker/item-picker";
import type { TStatusFilterProps } from "./status-filter.types";

type TStatusItem = {
  id: string;
  name: string;
};

export const StatusFilter = ({
  placeholder = "Filter by status...",
  title = "Filter by status",
}: TStatusFilterProps) => {
  const { filters, updateFilters } = useFilterContext();
  const [selectedStatuses, setSelectedStatuses] = useState<EStatusType[]>(filters.statuses);

  // Use static enum values instead of deriving from assets
  const availableOptions = useMemo(() => {
    return Object.values(EStatus).map((status) => ({
      id: status,
      name: status,
    }));
  }, []);

  const selectedItems = useMemo(() => {
    return selectedStatuses.map((status) => ({
      id: status,
      name: status,
    }));
  }, [selectedStatuses]);

  const updateSelection = (newStatuses: EStatus[]) => {
    setSelectedStatuses(newStatuses);
    updateFilters("statuses", newStatuses);
  };

  const handleToggle = (item: TStatusItem) => {
    const status = item.id as EStatus;
    const newStatuses = selectedStatuses.includes(status)
      ? selectedStatuses.filter((s) => s !== status)
      : [...selectedStatuses, status];
    updateSelection(newStatuses);
  };

  const handleRemove = (item: TStatusItem) => {
    const status = item.id as EStatus;
    const newStatuses = selectedStatuses.filter((s) => s !== status);
    updateSelection(newStatuses);
  };

  const handleReset = () => {
    updateSelection([]);
  };

  const handleSelectAll = () => {
    const allStatuses = Object.values(EStatus);
    updateSelection(allStatuses);
  };

  const isSelected = (itemId: string) => {
    return selectedStatuses.includes(itemId as EStatus);
  };

  return (
    <ItemPicker<TStatusItem>
      selectedItems={selectedItems}
      selectItemKey="id"
      placeholder={placeholder}
      selectedItemRender={{
        labelKey: "name",
        removeSelectedItem: handleRemove,
        renderChip: (item, removeSelectedItem) => (
          <CustomBadge
            backgroundColor={statusColors[item.id as EStatus].backgroundColor}
            color={statusColors[item.id as EStatus].color}
            text={statusColors[item.id as EStatus].text}
            deleteIcon={<Close sx={{ width: 12, height: 12, color: "white" }} />}
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
                  backgroundColor={statusColors[item.id as EStatus].backgroundColor}
                  color={statusColors[item.id as EStatus].color}
                  text={statusColors[item.id as EStatus].text}
                />
              }
            />
          ),
        },
      }}
    />
  );
};
