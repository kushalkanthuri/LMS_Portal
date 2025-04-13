import type { Classrooms, UserRole, Users } from "@prisma/client";

declare global {
  type ActionOutput<T extends object = {}> = Promise<
    ({ success: true } & T) | { success: false; error: string }
  >;

  type User = {
    id: string
    email: string
    name: string
    role: $Enums.UserRole
    classroomsId?: string | null
  }

  interface SessionUser {
    user: Omit<User, "password" | "createdAt" | "updatedAt">
  }

  interface ClassroomWithStudents extends Classrooms {
    students: Omit<
      Users,
      "password",
      "createdAt",
      "updatedAt",
      "classroomId"
    >[];
  }
}

export {};
