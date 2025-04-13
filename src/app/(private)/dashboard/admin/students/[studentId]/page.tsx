import { getStudent, getStudents } from "@/actions/users"
import { Error } from "@/components/error"

export default async function StudentDetailPage({
  params,
}: {
  params: Promise<{ studentId: string }>
}) {
  const { studentId } = await params
  const result = await getStudent(studentId)
  if (!result.success) {
    return <Error e={result.error} />
  }

  return (
    <main className="size-full p-16">
      <h1 className="text-3xl font-poppins font-semibold">
        {result.student.name}
      </h1>
      <div>Student detail page</div>
    </main>
  )
}
