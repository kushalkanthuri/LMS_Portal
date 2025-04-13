"use client"

import { logoutUser } from "@/actions/auth"
import { Button } from "@/elements/button"
import { redirect } from "next/navigation"
import { useState } from "react"
import { toast } from "sonner"

export default function LogoutButton() {
  const [isLoading, setIsLoading] = useState(false)

  const handleLogout = async () => {
    setIsLoading(true)
    const res = await logoutUser()
    if (res.success) {
      redirect(res.redirect)
    } else {
      toast.error(res.error)
    }
    setIsLoading(false)
  }

  return (
    <Button isLoading={isLoading} variant="destructive" onClick={handleLogout} className="w-full">
      Logout
    </Button>
  )
}
