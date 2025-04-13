import { getStudents } from "@/actions/users";
import { columns } from "./_students-table/columns";
import { DataTable } from "./_students-table/data-table";
import { Error } from "@/components/error";

export default async function StudentsPage() {
  const result = await getStudents()
  if (!result.success) {
    return <Error e={result.error} />
  }

  return (
    <main className="size-full p-16">
      <h1 className="text-3xl font-poppins font-semibold">Students</h1>
      <DataTable columns={columns} data={result.students} />
    </main>
  )
}