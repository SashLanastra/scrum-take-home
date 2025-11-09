import type { ColDef, ICellRendererParams } from "ag-grid-community";
import { AllCommunityModule, ModuleRegistry, themeQuartz } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import { useEffect, useState } from "react";
import { useAssetsContext } from "../../context/hooks/assets-hook";
import type { TTableDisplayRow } from "./table-display.types";
import "./table-display.scss";
import { CustomBadge } from "../badges/custom-badge";
import { statusColors, typeColors } from "../badges/helpers";

ModuleRegistry.registerModules([AllCommunityModule]);

const myTheme = themeQuartz.withParams({
  headerHeight: 48,
  headerFontSize: 14,
  headerFontWeight: 600,
  spacing: 8,
  headerTextColor: "#ffffff",
  headerBackgroundColor: "rgb(32, 50, 51)",
  oddRowBackgroundColor: "rgba(30, 50, 51, 0.17)",
  headerColumnResizeHandleColor: "rgb(0, 190, 170)",
});

export const TableDisplay = () => {
  const { filteredAssets } = useAssetsContext();
  const [rowData, setRowData] = useState<TTableDisplayRow[]>([]);

  useEffect(() => {
    if (filteredAssets && filteredAssets.length > 0) {
      setRowData(filteredAssets);
    }
  }, [filteredAssets]);

  const [colDefs] = useState<ColDef<TTableDisplayRow>[]>([
    {
      field: "name",
      headerName: "Name",
      minWidth: 150,
    },
    {
      field: "value",
      headerName: "Value",
      minWidth: 100,
    },
    {
      field: "type",
      headerName: "Type",
      minWidth: 120,
      cellRenderer: (params: ICellRendererParams<TTableDisplayRow>) => {
        if (!params.data?.type) return null;
        return (
          <CustomBadge
            backgroundColor={typeColors[params.data.type].backgroundColor}
            color={typeColors[params.data.type].color}
            text={typeColors[params.data.type].text}
            icon={typeColors[params.data.type].icon}
          />
        );
      },
    },
    {
      field: "status",
      headerName: "Status",
      minWidth: 120,
      cellRenderer: (params: ICellRendererParams<TTableDisplayRow>) => {
        if (!params.data?.status) return null;
        return (
          <CustomBadge
            backgroundColor={statusColors[params.data.status].backgroundColor}
            color={statusColors[params.data.status].color}
            text={statusColors[params.data.status].text}
          />
        );
      },
    },
  ]);

  const defaultColDef: ColDef = {
    flex: 1,
    resizable: true,
    sortable: true,
  };

  return (
    <div className="table-display-wrapper" style={{ width: "100%", height: "276px" }}>
      <AgGridReact
        rowData={rowData}
        columnDefs={colDefs}
        defaultColDef={defaultColDef}
        theme={myTheme}
        suppressMenuHide={false}
        animateRows={true}
      />
    </div>
  );
};
