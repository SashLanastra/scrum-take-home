import "./header.scss";
import { Add as AddIcon } from "@mui/icons-material";
import { CustomButton } from "../custom-button/custom-button";

export const Header = () => {
  return (
    <header className="navbar">
      <img src="/assets_logo.svg" alt="logo" width={200} height={100} className="navbar-logo" />
      {/* <div className="navbar-actions">
        <CustomButton customVariant="fill" customSize="medium">
          <AddIcon fontSize="inherit" sx={{ color: "#F79E00" }} />
          add asset
        </CustomButton>
      </div> */}
    </header>
  );
};
