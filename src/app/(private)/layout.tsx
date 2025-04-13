import Loader from "@/components/loader"
import { Suspense } from "react"

export default async function PrivateLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Suspense fallback={<Loader />}>{children}</Suspense>
    </>
  )
}
