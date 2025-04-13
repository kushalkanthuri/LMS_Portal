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
import type { Subjects } from "@prisma/client"
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal, Link as LinkIcon } from "lucide-react";
import Link from "next/link";

export const columns: ColumnDef<{
  id: string
  name: string
  facultyEmail: string
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
    header: "Name",
  },
  {
    accessorKey: "facultyEmail",
    header: "Faculty Email",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return (
        <Link
          href={`/dashboard/admin/classrooms/${row.original.id}`}
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
