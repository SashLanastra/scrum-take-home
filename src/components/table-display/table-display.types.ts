import type { IAsset } from "../../api/assets";

export type TTableDisplayRow = Omit<IAsset, "id">;
