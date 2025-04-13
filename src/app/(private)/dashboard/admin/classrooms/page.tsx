import { getClassrooms } from "@/actions/classrooms";
import { columns } from "./_classroom-table/columns";
import { DataTable } from "./_classroom-table/data-table";
import { Error } from "@/components/error";

export default async function ClassroomsPage() {
  const res = await getClassrooms();

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
          createdAt: room.createdAt.toLocaleString().trim(),
          updatedAt: room.updatedAt.toLocaleString().trim(),
        }))}
      />
    </main>
  );
}
