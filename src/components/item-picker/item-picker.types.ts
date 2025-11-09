import type { ReactNode } from "react";

export type TFooterRenderProps = {
  handleClose: () => void;
};

export type TItemPickerProps<T extends Record<string, any>, K extends keyof T = keyof T> = {
  // List of selected items
  selectedItems: T[];
  // property that is used to identify item (usually some kind of Id)
  selectItemKey: K;
  // text displayed if no selected items
  placeholder: ReactNode;

  disabled?: boolean;

  selectedItemRender: {
    // property that is used to display selected item
    labelKey: K;
    // additional className for selected item
    getClassName?: (item?: T) => string;
    // handler for cross button on selected item
    removeSelectedItem: (item: T) => void;
    // className for wrapper of selected items
    wrapperClassName?: string;
    // custom render function for selected items (chips)
    renderChip?: (item: T, removeSelectedItem: (item: T) => void) => ReactNode;
  };

  popover: {
    popoverClassName?: string;
    // additional option for popover list
    additionalListOption?: ReactNode;
    // handler for NONE button on popover
    resetSelectedItems: () => void;
    // handler for ALL button on popover
    // if not provided button won't be rendered
    selectAllItems?: () => void;
    allButtonText?: ReactNode;
    resetButtonText?: ReactNode;
    // handler for checking/unchecking list items
    toggleSelectedItem: (item: T) => void;
    // data displayed in popover list
    listData: T[];
    // title for popover
    title?: string;
    isWithHeader?: boolean;
    // handler for closing popover (optional)
    // usefull in case when you need to save selected items before closing popover (API calls mainly)
    onClose?: (items: T[]) => void;
    // render footer for popover
    footerRender?: (props: TFooterRenderProps) => ReactNode;
    listItemRender: {
      // property that is used to display items in list
      labelKey: K;
      // callback for additional node (right side of popover list item)
      additionalNodeRender?: (item: T) => ReactNode;
      // callback for rendering node instead of default
      nodeRender?: (item: T) => ReactNode;
    };
  };
};
