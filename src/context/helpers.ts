import type { IAsset } from "../api/assets";
import { EFilterType } from "./providers";

export const filterTypeMapping: Record<EFilterType, keyof IAsset> = {
  [EFilterType.STATUS]: "status",
  [EFilterType.TYPE]: "type",
};
