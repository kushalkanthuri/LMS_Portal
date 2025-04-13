"use client";

import LogoutButton from "@/components/logout-button";
import { cn } from "@/lib/utils";
import { Group, LayoutDashboard, School, UserIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const LIST_ITEMS = [
  { label: "Dashboard", href: "/dashboard/admin", Icon: LayoutDashboard },
  { label: "Classrooms", href: "/dashboard/admin/classrooms", Icon: School },
  { label: "Students", href: "/dashboard/admin/students", Icon: School },
  { label: "Faculties", href: "/dashboard/admin/faculties", Icon: Group },
  { label: "Profile", href: "/dashboard/admin/profile", Icon: UserIcon },
]

export default function Sidebar() {
  const path = usePathname()

  return (
    <aside className="size-full min-w-56 max-w-[16vw] border-r flex flex-col items-center py-16 px-5 gap-16">
      <Link href="/dashboard" className="text-2xl font-poppins font-semibold">
        Campus Bridge
      </Link>
      <nav className="w-full flex flex-col gap-2">
        {LIST_ITEMS.map((item, index) => {
          const isActive = path === item.href
          return (
            <Link
              key={index}
              href={item.href}
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
      <div className="h-full flex flex-col justify-end w-full">
        <LogoutButton />
      </div>
    </aside>
  )
}
