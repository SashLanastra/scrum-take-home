import type { IAsset } from ".";

export const mockAssets = [
  { id: 1, name: "Apple Inc.", value: 15000, type: "STOCK", status: "ACTIVE" },
  { id: 2, name: "Ethereum", value: 8000, type: "CRYPTO", status: "ACTIVE" },
  {
    id: 3,
    name: "Tesla Motors",
    value: 9500,
    type: "STOCK",
    status: "PENDING",
  },
  {
    id: 4,
    name: "US Treasury Bond",
    value: 20000,
    type: "BOND",
    status: "ACTIVE",
  },
  {
    id: 5,
    name: "Bitcoin",
    value: 32000,
    type: "CRYPTO",
    status: "LIQUIDATED",
  },
] as IAsset[];
