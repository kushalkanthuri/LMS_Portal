"use client";

import { buttonVariants } from "@/elements/button";
import { Checkbox } from "@/elements/checkbox";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";

export const columns: ColumnDef<{
  name: string
  id: string
  subjectName: string
  students: number
}>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="object-center self-center"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "name",
    header: "School Name",
  },
  {
    accessorKey: "subjectName",
    header: "Subject Name",
  },
  {
    accessorKey: "students",
    header: "Students",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return (
        <Link
          href={`/dashboard/faculty/classrooms/${row.original.id}/analytics`}
          className={buttonVariants({
            variant: "outline",
            size: "sm",
            className: "h-6 [&_svg:not([class*='size-'])]:size-2",
          })}
        >
          Details
        </Link>
      )
    },
  },
]
