import { ColumnDef } from "@tanstack/react-table";
import { TrackSchema } from "../../../contract";
import { z } from "zod";
const dateFormatter = new Intl.DateTimeFormat("en", {
  dateStyle: "medium",
  timeStyle: "short",
});

export const columns: ColumnDef<z.infer<typeof TrackSchema>>[] = [
  {
    id: "coverUrl",
    accessorKey: "coverUrl",
    header: undefined,
    cell: ({ row }) => {
      const coverUrl = row.getValue<string>("coverUrl");
      console.log(coverUrl);
      return <img src={coverUrl} className="w-12" />;
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
      const date = new Date(row.getValue("createdAt"));
      return <span>{dateFormatter.format(date)}</span>;
    },
  },
];
