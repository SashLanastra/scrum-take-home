import { AccountBalance, CurrencyBitcoin, TrendingUp } from "@mui/icons-material";
import { EStatus, EType } from "../../api/assets";

export const statusColors = {
  [EStatus.ACTIVE]: {
    backgroundColor: "#10b981",
    color: "#ffffff",
    text: "Active",
  },
  [EStatus.PENDING]: {
    backgroundColor: "#f59e0b",
    color: "#ffffff",
    text: "Pending",
  },
  [EStatus.LIQUIDATED]: {
    backgroundColor: "#ef4444",
    color: "#ffffff",
    text: "Liquidated",
  },
};

export const typeColors = {
  [EType.STOCK]: {
    backgroundColor: "#E3F2FD",
    color: "#1565C0",
    border: "#2196F3",
    text: "Stock",
    icon: <TrendingUp sx={{ width: 16, height: 16, color: "#1565C0" }} />,
  },
  [EType.BOND]: {
    backgroundColor: "#E0F2F1",
    color: "#00695C",
    border: "#009688",
    text: "Bond",
    icon: <AccountBalance sx={{ width: 16, height: 16, color: "#00695C" }} />,
  },
  [EType.CRYPTO]: {
    backgroundColor: "#FFF3E0",
    color: "#E65100",
    border: "#FF9800",
    text: "Crypto",
    icon: <CurrencyBitcoin sx={{ width: 16, height: 16, color: "#E65100" }} />,
  },
};
