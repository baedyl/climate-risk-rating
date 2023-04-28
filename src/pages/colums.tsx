import React from 'react'
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<any, any>[] = [
  {
    accessorKey: "asset_name",
    header: "Asset Name",
  },
  {
    accessorKey: "business_category",
    header: "Business Category",
  },
  {
    accessorKey: "lat",
    header: "Lat",
  },
  {
    accessorKey: "long",
    header: "Long",
  },
  {
    accessorKey: "risk_factors",
    header: "Risk Factors",
  },
  {
    accessorKey: "risk_rating",
    header: "Risk Rating",
  },
  {
    accessorKey: "year",
    header: "Year",
  },
];