import { useEffect, useRef, useState } from "react";
import { StyledTooltip } from "../styled-tooltip/styled-tooltip";
import type { TOverflowListProps } from "./overflow-list.types";
import "./overflow-list.scss";

export const OverflowList = <T,>(props: TOverflowListProps<T>) => {
  const {
    items,
    renderItem,
    renderItemContent = true,
    moreElement = (count: number) => <div className="overflow-list__more">+{count} more</div>,
    className = "",
    renderTooltipItem,
  } = props;
  const containerRef = useRef<HTMLDivElement>(null);
  const measureRef = useRef<HTMLDivElement>(null);
  const [visibleCount, setVisibleCount] = useState<number>(items.length);
  const [, setIsMeasuring] = useState(true);

  useEffect(() => {
    const calculateVisibleItems = () => {
      const container = containerRef.current;
      const measure = measureRef.current;
      if (!container || !measure) return;

      // Reset to show all items
      setVisibleCount(items.length);

      const containerWidth = container.offsetWidth;
      const measureChildren = Array.from(measure.children) as HTMLElement[];

      let totalWidth = 0;
      let newVisibleCount = items.length;

      // Calculate how many items fit
      for (let i = 0; i < measureChildren.length; i++) {
        const itemWidth = measureChildren[i].offsetWidth;
        const moreWidth = 60; // Approximate width of "+N more"
        const margin = i > 0 ? 8 : 0; // Gap between items

        if (
          totalWidth + itemWidth + margin + (i < items.length - 1 ? moreWidth : 0) >
          containerWidth
        ) {
          newVisibleCount = i;
          break;
        }

        totalWidth += itemWidth + margin;
      }

      setVisibleCount(Math.max(1, newVisibleCount));
      setIsMeasuring(false);
    };

    // Reset measuring state when items change
    setIsMeasuring(true);

    // Initial calculation
    calculateVisibleItems();

    // Setup resize observer
    const resizeObserver = new ResizeObserver(() => {
      setIsMeasuring(true);
      calculateVisibleItems();
    });

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => resizeObserver.disconnect();
  }, [items]);

  const visibleTableTagsItems = items.slice(0, visibleCount);
  const hiddenTableTagsCount = items.length - visibleTableTagsItems.length;

  // Helper function to get text content from rendered items
  const getHiddenItemsTooltip = () => {
    if (!renderTooltipItem) return null;
    const allItems = [...items];
    return (
      <ul className="overflow-list__tooltip-list">
        {allItems.map((item, index) => {
          return (
            <li key={`${item}`} style={{ listStyleType: "none" }}>
              {renderTooltipItem(item, index)}
            </li>
          );
        })}
      </ul>
    );
  };

  const renderTagsComponent = () => {
    return (
      <div className="overflow-list__content">
        {visibleTableTagsItems.map((item, index) => (
          <div key={`${item}`}>{renderItemContent ? renderItem(item, index) : null}</div>
        ))}
        {hiddenTableTagsCount > 0 && <div>{moreElement(hiddenTableTagsCount)}</div>}
      </div>
    );
  };

  return (
    <div className={`overflow-list ${className}`.trim()} ref={containerRef}>
      {/* Hidden measurement div - only render while measuring */}
      <div ref={measureRef} className="overflow-list__measure">
        {renderItemContent &&
          items.map((item, index) => (
            <div key={`${item}`}>{renderItemContent ? renderItem(item, index) : null}</div>
          ))}
      </div>

      {/* Visible content */}
      {renderItemContent && (
        <StyledTooltip title={<div>{getHiddenItemsTooltip()}</div>}>
          {renderTagsComponent()}
        </StyledTooltip>
      )}
    </div>
  );
};

export default OverflowList;
