import { useContext } from "react";
import { AssetsContext } from "../providers/assets-provider";

export const useAssetsContext = () => {
  const context = useContext(AssetsContext);
  if (context === undefined) {
    throw new Error("useAssetsContext must be used within an AssetsProvider");
  }
  return context;
};
