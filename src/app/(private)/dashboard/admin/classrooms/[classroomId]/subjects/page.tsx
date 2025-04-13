import { getSubjectsByClassroomId } from "@/actions/subjects";
import { buttonVariants } from "@/elements/button";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { columns } from "./_subjects-table/columns";
import { DataTable } from "./_subjects-table/data-table";

export default async function SubjectsPage({
  params,
}: {
  params: Promise<{ classroomId: string }>;
}) {
  const { classroomId } = await params
  const result = await getSubjectsByClassroomId(classroomId)

  if (!result.success) {
    return (
      <main className="size-full flex flex-col items-center justify-center gap-3">
        <h1 className="text-2xl font-roboto font-medium">Oops!</h1>
        <h3 className="text-4xl font-poppins font-semibold">
          Classroom not found
        </h3>
        <Link
          href="/dashboard/admin/classrooms"
          className={buttonVariants({ className: "mt-6" })}
        >
          <ChevronLeft size={24} strokeWidth={3} /> Back to classrooms
        </Link>
      </main>
    )
  }

  return (
    <main className="size-full p-16 flex flex-col gap-4">
      <div className="flex flex-col gap-6 justify-center items-start">
        <h1 className="font-poppins text-lg font-medium leading-0">Subjects</h1>
      </div>
      <DataTable
        columns={columns}
        data={result.subjects.map((sub) => ({
          id: sub.id,
          name: sub.name,
          facultyEmail: sub.faculty.email,
        }))}
      />
    </main>
  )
}
