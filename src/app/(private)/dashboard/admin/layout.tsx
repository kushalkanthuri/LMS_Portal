import Loader from "@/components/loader";
import Sidebar from "./_components/sidebar"
import { Suspense } from "react";

export default async function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Sidebar />
      <Suspense fallback={<Loader />}>{children}</Suspense>
    </>
  )
}
