import type { ReactNode } from "react";
import { createContext, useCallback, useContext, useMemo, useState } from "react";
import type { EStatus, EType, IAsset } from "../../api/assets";
import { useMockFetchAssets } from "../../api/assets/api/get-assets";

type TAssetFilters = {
  statuses: EStatus[];
  types: EType[];
};

// Context for filter state only (no data, no suspension)
type TFilterContextValue = {
  filters: TAssetFilters;
  updateFilters: (filterKey: keyof TAssetFilters, values: EStatus[] | EType[]) => void;
};

// Context for assets data (will suspend)
type TAssetsContextValue = {
  allAssets: IAsset[];
  filteredAssets: IAsset[];
};

export const FilterContext = createContext<TFilterContextValue | undefined>(undefined);
export const AssetsContext = createContext<TAssetsContextValue | undefined>(undefined);

type TAssetsProviderProps = {
  children: ReactNode;
};

// Provider for filter state - NO suspension, renders immediately
export const AssetsProvider = ({ children }: TAssetsProviderProps) => {
  const [filters, setFilters] = useState<TAssetFilters>({
    statuses: [],
    types: [],
  });

  const updateFilters = useCallback(
    (filterKey: keyof TAssetFilters, values: EStatus[] | EType[]) => {
      setFilters((prev) => ({
        ...prev,
        [filterKey]: values,
      }));
    },
    [],
  );

  const filterContextValue = useMemo(
    () => ({
      filters,
      updateFilters,
    }),
    [filters, updateFilters],
  );

  return <FilterContext.Provider value={filterContextValue}>{children}</FilterContext.Provider>;
};

// Hook to access filter context
export const useFilterContext = () => {
  const context = useContext(FilterContext);
  if (context === undefined) {
    throw new Error("useFilterContext must be used within an AssetsProvider");
  }
  return context;
};

// Separate provider that fetches data - WILL suspend
export const AssetsDataProvider = ({ children }: { children: ReactNode }) => {
  const { data: assets } = useMockFetchAssets(); // Suspends here!
  const { filters } = useFilterContext();

  // Compute filtered assets based on active filters
  const filteredAssets = useMemo(() => {
    let filtered = assets;

    if (filters.statuses.length > 0) {
      filtered = filtered.filter((asset) => filters.statuses.includes(asset.status));
    }

    if (filters.types.length > 0) {
      filtered = filtered.filter((asset) => filters.types.includes(asset.type));
    }

    return filtered;
  }, [assets, filters]);

  const contextValue = useMemo(
    () => ({
      allAssets: assets,
      filteredAssets,
    }),
    [assets, filteredAssets],
  );

  return <AssetsContext.Provider value={contextValue}>{children}</AssetsContext.Provider>;
};
