import { ColumnDef } from "@tanstack/react-table";
import { TrackSchema } from "../../../contract";
import { z } from "zod";
const dateFormatter = new Intl.DateTimeFormat("en", {
  dateStyle: "medium",
  timeStyle: "short",
  timeZone: "Europe/Amsterdam",
});

export const columns: ColumnDef<z.infer<typeof TrackSchema>>[] = [
  {
    id: "coverUrl",
    accessorKey: "coverUrl",
    header: undefined,
    cell: ({ row }) => {
      const coverUrl = row.getValue<string>("coverUrl");
      return (
        <img
          src={coverUrl}
          alt={`cover image of ${row.getValue("title")}`}
          className="w-12"
        />
      );
    },
  },
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
    cell: ({ row }) => {
      const date = new Date(row.getValue("createdAt") + "Z");
      return <span>{dateFormatter.format(date)}</span>;
    },
  },
];
