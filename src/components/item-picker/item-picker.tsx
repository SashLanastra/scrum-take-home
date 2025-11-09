import { Close, ExpandLess } from "@mui/icons-material";
import { Button, Chip, Popover } from "@mui/material";
import type React from "react";
import { useMemo, useState } from "react";
import { OverflowList } from "../overflow-list/overflow-list";
import type { TItemPickerProps } from "./item-picker.types";
import "./item-picker.scss";

// This component is used to display list with popover for picking items
function ItemPickerInner<T extends Record<string, any>, K extends keyof T>(
  props: TItemPickerProps<T, K>,
) {
  const {
    selectedItems,
    selectItemKey,
    selectedItemRender,
    popover,
    placeholder,
    disabled = false,
  } = props;

  const {
    allButtonText,
    resetSelectedItems,
    selectAllItems,
    toggleSelectedItem,
    listData,
    onClose,
    title,
    resetButtonText,
    isWithHeader = true,
    additionalListOption,
    popoverClassName,
    listItemRender,
    footerRender,
  } = popover;

  const { additionalNodeRender, nodeRender } = listItemRender;
  const {
    labelKey: selectedItemLabelKey,
    getClassName,
    removeSelectedItem,
    wrapperClassName,
    renderChip,
  } = selectedItemRender;

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const isOpen = Boolean(anchorEl);

  const selectedItemKeys = useMemo(
    () => selectedItems.map((item) => item[selectItemKey]),
    [selectedItems, selectItemKey],
  );

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    onClose?.(selectedItems);
  };

  const handleItemToggle = (item: T) => {
    toggleSelectedItem(item);
  };

  return (
    <div className="item-picker">
      <Button
        variant="outlined"
        disabled={disabled}
        onClick={handleClick}
        className={`item-picker__trigger ${wrapperClassName || ""}`}
        fullWidth
      >
        <div className="item-picker__trigger-content">
          {selectedItems.length > 0 ? (
            <OverflowList<T>
              items={selectedItems}
              renderItem={(item) =>
                renderChip ? (
                  renderChip(item, removeSelectedItem)
                ) : (
                  <Chip
                    key={item[selectItemKey] as string}
                    label={
                      <span className="item-picker__chip-label">
                        {item[selectedItemLabelKey] as string}
                      </span>
                    }
                    className={`item-picker__chip ${getClassName?.(item) || ""}`}
                    deleteIcon={<Close className="item-picker__chip-delete-icon" />}
                    onDelete={(e) => {
                      e.stopPropagation();
                      removeSelectedItem(item);
                    }}
                  />
                )
              }
              renderTooltipItem={(item) => (
                <div className="item-picker__tooltip-item">{item[selectedItemLabelKey]}</div>
              )}
            />
          ) : (
            <span className="item-picker__placeholder">{placeholder}</span>
          )}
        </div>
        <ExpandLess
          className="item-picker__chevron"
          sx={{
            transition: "transform 200ms ease-in-out",
            transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
          }}
        />
      </Button>

      <Popover
        open={isOpen}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        className="item-picker__popover"
        slotProps={{
          paper: {
            className: `item-picker__popover-paper ${popoverClassName || ""}`,
          },
        }}
      >
        <div className="item-picker__popover-content">
          {isWithHeader && (
            <div className="item-picker__header">
              <h4 className="item-picker__title">{title}</h4>
              <div className="item-picker__header-buttons">
                <Button
                  variant="text"
                  size="small"
                  onClick={resetSelectedItems}
                  className="item-picker__header-button"
                >
                  {resetButtonText || "None"}
                </Button>
                {selectAllItems && (
                  <Button
                    variant="text"
                    size="small"
                    onClick={selectAllItems}
                    className="item-picker__header-button"
                  >
                    {allButtonText || "All"}
                  </Button>
                )}
              </div>
            </div>
          )}

          <div className="item-picker__list">
            <div className="item-picker__list-inner">
              {additionalListOption}
              {listData.length > 0 ? (
                listData.map((item) => (
                  <button
                    key={item[selectItemKey] as string}
                    type="button"
                    className={`item-picker__list-item ${
                      selectedItemKeys.includes(item[selectItemKey]) ? "selected" : ""
                    }`}
                    onClick={() => handleItemToggle(item)}
                  >
                    <div className="item-picker__list-item-content">{nodeRender?.(item)}</div>
                    {additionalNodeRender?.(item)}
                  </button>
                ))
              ) : (
                <div className="item-picker__empty">No results found</div>
              )}
            </div>
          </div>

          {footerRender && (
            <div className="item-picker__footer">{footerRender({ handleClose })}</div>
          )}
        </div>
      </Popover>
    </div>
  );
}

// Export with proper generic support
export const ItemPicker = ItemPickerInner as <
  T extends Record<string, any>,
  K extends keyof T = keyof T,
>(
  props: TItemPickerProps<T, K>,
) => React.JSX.Element;
