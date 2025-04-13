import Loader from "@/components/loader"
import { Suspense } from "react"
import Sidebar from "./_components/side-bar"

export default async function PortalLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Sidebar />
      <Suspense fallback={<Loader />}>{children}</Suspense>
    </>
  )
}
