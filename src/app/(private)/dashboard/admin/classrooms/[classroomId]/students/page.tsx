import { getClassroomByID } from "@/actions/classrooms";
import { buttonVariants } from "@/elements/button";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { columns } from "./_students-table/columns";
import { DataTable } from "./_students-table/data-table";
import { Error } from "@/components/error";

export default async function StudentsPage({
  params,
}: {
  params: Promise<{ classroomId: string }>;
}) {
  const { classroomId } = await params;
  const result = await getClassroomByID(classroomId);
  if (!result.success) {
    return <Error e={result.error} />
  }

  if (!result.classroom) {
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
    );
  }

  return (
    <main className="size-full p-16 flex flex-col gap-4">
      {/* TODO: Remove BAckButton */}
      {/* <BackButton /> */}
      <div className="flex flex-col gap-6 justify-center items-start">
        <h1 className="font-poppins text-lg font-medium leading-0">
          {result.classroom.name}
        </h1>
        <span className="text-sm text-accent-foreground/50 leading-0">
          {result.classroom.id}
        </span>
      </div>
      <DataTable columns={columns} data={result.classroom.students} />
    </main>
  )
}
