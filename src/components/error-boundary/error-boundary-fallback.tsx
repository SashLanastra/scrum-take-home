"use no memo";

import { ErrorOutline, Phone, Refresh } from "@mui/icons-material";
import type { FallbackProps } from "react-error-boundary";
import { CustomButton } from "../custom-button/custom-button";
import { Surface } from "../surface/surface";
import "./error-boundary-fallback.scss";

export const ErrorBoundaryFallback = ({ error, resetErrorBoundary }: FallbackProps) => {
  return (
    <Surface className="stats-section-surface">
      <div className="error-boundary-fallback">
        <div className="error-boundary-fallback__content">
          <ErrorOutline className="error-boundary-fallback__icon" />
          <div className="error-boundary-fallback__message-container">
            <div className="error-boundary-fallback__message-title">Failed to Load Data</div>
            <div className="error-boundary-fallback__message-text">
              {error.message || "An unexpected error occurred"}
            </div>
          </div>
          <div className="error-boundary-fallback__actions">
            <CustomButton
              onClick={resetErrorBoundary}
              customVariant="outline"
              customSize="medium"
              icon={<Refresh style={{ fontSize: "20px" }} />}
            >
              Retry
            </CustomButton>
            <a
              href="tel:+971501234567"
              target="_blank"
              rel="noopener noreferrer"
              className="error-boundary-fallback__link"
            >
              <CustomButton
                customVariant="pop"
                customSize="medium"
                icon={<Phone style={{ fontSize: "20px" }} />}
              >
                Support
              </CustomButton>
            </a>
          </div>
        </div>
      </div>
    </Surface>
  );
};
