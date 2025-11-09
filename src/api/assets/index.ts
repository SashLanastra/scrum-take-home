export enum EType {
  STOCK = "STOCK",
  BOND = "BOND",
  CRYPTO = "CRYPTO",
}

export enum EStatus {
  ACTIVE = "ACTIVE",
  PENDING = "PENDING",
  LIQUIDATED = "LIQUIDATED",
}

export interface IAsset {
  id: number;
  name: string;
  value: number;
  type: EType;
  status: EStatus;
}
