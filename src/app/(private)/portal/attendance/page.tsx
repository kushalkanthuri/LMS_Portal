import { getUserSession } from "@/actions/auth"
import { Graph } from "./_graph"
import { redirect } from "next/navigation"
import { getAttendences } from "@/actions/attendence"
import { Error } from "@/components/error"

export default async function Component() {
  const user = await getUserSession()
  if (!user) {
    redirect("/login")
  }

  const result = await getAttendences(user.id)
  if (!result.success) {
    return <Error e={result.error} />
  }

  return (
    <main className="size-full p-16 flex items-center justify-center">
      <Graph chartData={result.attendences} />
    </main>
  )
}
