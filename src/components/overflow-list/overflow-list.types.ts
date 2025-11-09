import type { ReactNode } from "react";

export type TOverflowListProps<T> = {
  items: T[];
  renderItem: (item: T, index: number) => ReactNode;
  renderItemContent?: boolean;
  renderTooltipItem?: (item: T, index: number) => ReactNode;
  moreElement?: (count: number) => ReactNode;
  className?: string;
};
