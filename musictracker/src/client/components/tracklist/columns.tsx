import { ColumnDef } from "@tanstack/react-table";
import { TrackSchema } from "../../../contract";
import { z } from "zod";

export const columns: ColumnDef<z.infer<typeof TrackSchema>>[] = [
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "artist",
    header: "Artist",
  },
  {
    accessorKey: "createdAt",
    header: "Date added",
  },
];
