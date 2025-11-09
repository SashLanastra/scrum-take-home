"use no memo";

import { ErrorOutline, Phone, Refresh } from "@mui/icons-material";
import type { FallbackProps } from "react-error-boundary";
import { CustomButton } from "../custom-button/custom-button";

export const TableErrorFallback = ({ error, resetErrorBoundary }: FallbackProps) => {
  return (
    <div
      style={{
        width: "100%",
        height: "276px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        border: "1px solid #e0e0e0",
        borderRadius: "8px",
        padding: "32px",
        backgroundColor: "#ffffff",
      }}
    >
      <div style={{ maxWidth: "500px", textAlign: "center" }}>
        <ErrorOutline
          style={{
            fontSize: "64px",
            color: "#ef4444",
            marginBottom: "16px",
          }}
        />
        <div
          style={{
            backgroundColor: "#fee2e2",
            border: "1px solid #fecaca",
            borderRadius: "8px",
            padding: "20px",
            marginBottom: "24px",
            textAlign: "left",
          }}
        >
          <div
            style={{
              fontWeight: 700,
              fontSize: "16px",
              marginBottom: "12px",
              color: "#991b1b",
              letterSpacing: "0.01em",
            }}
          >
            Failed to Load Assets
          </div>
          <div
            style={{
              color: "#6b7280",
              fontSize: "14px",
              lineHeight: "1.6",
            }}
          >
            {error.message || "An unexpected error occurred while fetching the data."}
          </div>
        </div>
        <div style={{ display: "flex", gap: "16px", width: "100%", justifyContent: "center" }}>
          <CustomButton
            onClick={resetErrorBoundary}
            customVariant="outline"
            customSize="medium"
            icon={<Refresh style={{ fontSize: "20px" }} />}
          >
            Retry Loading Data
          </CustomButton>
          <a
            href="tel:+971501234567"
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: "none" }}
          >
            <CustomButton
              customVariant="pop"
              customSize="medium"
              icon={<Phone style={{ fontSize: "20px" }} />}
            >
              Call Support
            </CustomButton>
          </a>
        </div>
      </div>
    </div>
  );
};
