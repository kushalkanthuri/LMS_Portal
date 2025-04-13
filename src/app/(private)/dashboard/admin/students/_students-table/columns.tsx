"use client";

import { Button, buttonVariants } from "@/elements/button";
import { Checkbox } from "@/elements/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/elements/dropdown-menu";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal, Link as LinkIcon } from "lucide-react";
import Link from "next/link";

export const columns: ColumnDef<{
  id: string
  email: string
  name: string
  classroom: string | null
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
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "classroom",
    header: "Classroom",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return (
        <Link
          href={`/dashboard/admin/students/${row.original.id}`}
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
