import { redirect } from "next/navigation";

export default async function ClassroomDetailsPage({
  params,
}: {
  params: Promise<{ classroomId: string }>;
}) {
  const { classroomId } = await params

  redirect(`/dashboard/admin/classrooms/${classroomId}/analytics`)
}
