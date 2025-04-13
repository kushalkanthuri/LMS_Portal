"use client";

import { cn } from "@/lib/utils";
import {
  ChevronLeft,
  LayoutDashboard,
  PercentSquare,
  School
} from "lucide-react";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

const LIST_ITEMS = [
  { label: "Analytics", href: "analytics", Icon: LayoutDashboard },
  { label: "Attendance", href: "attendance", Icon: PercentSquare },
  { label: "Students", href: "students", Icon: School },
]

export default function DetailsSidebar() {
  const path = usePathname();
  const { classroomId } = useParams<{ classroomId: string }>();

  return (
    <aside className="size-full min-w-56 max-w-[16vw] border-r-2 flex flex-col items-center justify-between py-32">
      <nav className="w-full flex flex-col gap-2 px-5">
        <Link
          href={"/dashboard/faculty/classrooms"}
          className={cn(
            "flex items-center h-fit gap-2 text-sm font-poppins px-8 py-3 rounded-md hover:bg-accent/70 hover:text-accent-foreground/80"
          )}
        >
          <ChevronLeft size={16} />
          Back
        </Link>

        {LIST_ITEMS.map((item, index) => {
          const isActive = path.includes(item.href)
          return (
            <Link
              key={index}
              href={`/dashboard/faculty/classrooms/${classroomId}/${item.href}`}
              className={cn(
                "flex items-center h-fit gap-2 text-sm font-poppins px-8 py-3 rounded-md",
                {
                  "bg-secondary text-secondary-foreground": isActive,
                },
                {
                  "hover:bg-accent/70 hover:text-accent-foreground/80":
                    !isActive,
                }
              )}
            >
              <item.Icon size={16} />
              {item.label}
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}
