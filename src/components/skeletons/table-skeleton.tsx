import { Box, Paper, Skeleton } from "@mui/material";

interface TableSkeletonProps {
  rows?: number;
}

export const TableSkeleton = ({ rows = 5 }: TableSkeletonProps) => {
  return (
    <Paper
      elevation={0}
      sx={{
        width: "100%",
        border: "1px solid #e0e0e0",
        borderRadius: 2,
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr 1fr",
          gap: 2,
          padding: "12px 16px",
          backgroundColor: "#1e293b",
          borderBottom: "3px solid #14b8a6",
        }}
      >
        <Skeleton
          variant="text"
          width={60}
          height={24}
          sx={{ bgcolor: "rgba(255, 255, 255, 0.2)" }}
        />
        <Skeleton
          variant="text"
          width={60}
          height={24}
          sx={{ bgcolor: "rgba(255, 255, 255, 0.2)" }}
        />
        <Skeleton
          variant="text"
          width={60}
          height={24}
          sx={{ bgcolor: "rgba(255, 255, 255, 0.2)" }}
        />
        <Skeleton
          variant="text"
          width={60}
          height={24}
          sx={{ bgcolor: "rgba(255, 255, 255, 0.2)" }}
        />
      </Box>

      {Array.from({ length: rows }).map((_, index) => (
        <Box
          key={`table-skeleton-row-${Math.random()}`}
          sx={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr 1fr",
            gap: 2,
            padding: "6px 12px",
            backgroundColor: index % 2 === 0 ? "#ffffff" : "#f5f5f5",
            borderBottom: index < rows - 1 ? "1px solid #e0e0e0" : "none",
          }}
        >
          {/* Name column */}
          <Skeleton variant="text" width="60%" height={20} />

          {/* Value column */}
          <Skeleton variant="text" width="50%" height={20} />

          {/* Type column (badge) */}
          <Skeleton variant="rounded" width={90} height={28} sx={{ borderRadius: "16px" }} />

          {/* Status column (badge) */}
          <Skeleton variant="rounded" width={90} height={28} sx={{ borderRadius: "16px" }} />
        </Box>
      ))}
    </Paper>
  );
};
