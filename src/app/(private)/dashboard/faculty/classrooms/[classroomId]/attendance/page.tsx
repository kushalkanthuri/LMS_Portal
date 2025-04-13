import { isAttendenceTookToday } from "@/actions/attendence"
import { getUserSession } from "@/actions/auth"
import { getStudentsByClassroom } from "@/actions/users"
import { Error } from "@/components/error"
import { redirect } from "next/navigation"
import { StudentsGrid } from "./../_components/_students-grid"

export default async function AttendancePage({
  params,
}: {
  params: Promise<{ classroomId: string }>
}) {
  const session = await getUserSession()
  if (!session) {
    redirect("/login")
  }
  const { classroomId } = await params
  const result = await isAttendenceTookToday(classroomId, session.id)
  if (!result.success) {
    return <Error e={result.error} />
  }

  if (result.isTookToday === true) {
    return (
      <main className="size-full flex flex-col gap-6 items-center justify-center">
        <h3 className="text-4xl font-poppins font-semibold">
          {new Date().toDateString()}
        </h3>
        <h1 className="text-xl font-roboto font-medium">
          Attendence already submitted
        </h1>
      </main>
    )
  }

  const studentsResult = await getStudentsByClassroom(classroomId)

  if (!studentsResult.success) {
    return <Error e={studentsResult.error} />
  }

  return (
    <StudentsGrid
      students={studentsResult.students.map((student) => ({
        ...student,
        checked: true,
      }))}
      subjectId={result.subjectId}
    />
  )
}
