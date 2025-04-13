import { getClassrooms, getSubjectsClassroom } from "@/actions/classrooms";
import { columns } from "./_classroom-table/columns";
import { DataTable } from "./_classroom-table/data-table"
import { Error } from "@/components/error";
import { getUserSession } from "@/actions/auth";
import { redirect } from "next/navigation";

export default async function ClassroomsPage() {
  const user = await getUserSession()
  if (!user) {
    redirect("/login")
  }

  const res = await getSubjectsClassroom(user.id)

  if (!res.success) {
    return <Error e={res.error} />
  }

  return (
    <main className="size-full p-16">
      <h1 className="text-2xl font-poppins font-semibold pl-1">Classrooms</h1>
      <DataTable
        columns={columns}
        data={res.classrooms.map((room) => ({
          id: room.id.trim(),
          name: room.name.trim(),
          subjectName: room.subejects.map((subject) => subject.name).join(", "),
          students: room._count.students,
        }))}
      />
    </main>
  )
}
