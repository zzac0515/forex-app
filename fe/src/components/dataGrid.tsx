import * as React from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Box } from "@mui/material";

interface SharedDataGridProps<T extends { id: string | number }> {
  page: number;
  rows: T[];
  columns: GridColDef[];
  dataLength: number;
  itemsPerPage: number;
  onPageChange?: (page: number) => void;
}

export default function SharedDataGrid<T extends { id: string | number }>({
  page,
  rows,
  columns,
  dataLength,
  itemsPerPage,
  onPageChange,
}: SharedDataGridProps<T>) {
  return (
    <Box sx={{ width: "100%", height: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSizeOptions={[itemsPerPage]}
        paginationModel={{ page: page - 1, pageSize: itemsPerPage }}
        onPaginationModelChange={({ page }) => onPageChange?.(page)}
        paginationMode="server"
        rowCount={dataLength}
        disableColumnMenu
      />
    </Box>
  );
}
