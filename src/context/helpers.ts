import type { IAsset } from "../api/assets";
import { EFilterType } from "./providers";

export const filterTypeMapping: Record<EFilterType, keyof IAsset> = {
  [EFilterType.STATUS]: "status",
  [EFilterType.TYPE]: "type",
};

export const getUniqueValues = <T extends keyof typeof filterTypeMapping>(
  assets: IAsset[],
  filterType: T,
) => {
  return Array.from(
    new Set(assets.map((asset) => asset[filterTypeMapping[filterType] as keyof IAsset])),
  );
};
