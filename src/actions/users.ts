"use server"

import { prisma } from "@/lib/db"
import { Users } from "@prisma/client"

export async function getUsersWithoutClassroom(): ActionOutput<{
  users: { id: string; email: string }[]
}> {
  try {
    const users = await prisma.users.findMany({
      select: {
        id: true,
        email: true,
      },
      where: {
        classroomsId: null,
        role: "student",
      },
    })

    return { success: true, users }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Something went wrong",
    }
  }
}

export async function getFaculties(): ActionOutput<{ users: User[] }> {
  try {
    const users = await prisma.users.findMany({
      where: {
        role: "faculty",
        classroomsId: {
          equals: null,
        },
      },
      omit: { password: true, createdAt: true, updatedAt: true },
    })

    return {
      success: true,
      users,
    }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Something went wrong",
    }
  }
}

export const getStudents = async (
): ActionOutput<{
  students: {
    id: string
    email: string
    name: string
    classroom: string | null
  }[]
}> => {
  try {
    const students = await prisma.users.findMany({
      where: { role: "student" },
      include: {
        Classrooms: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      omit: {
        password: true,
        createdAt: true,
        updatedAt: true,
        role: true,
        classroomsId: true,
      },
    })
    return {
      success: true,
      students: students.map((student) => ({
        id: student.id,
        email: student.email,
        name: student.name,
        classroom: student.Classrooms?.name || null,
      })),
    }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Something went wrong",
    }
  }
}

export const getStudent = async (
  studentId: string
): ActionOutput<{
  student: {
    id: string
    email: string
    name: string
    classroom: string | null
  }
}> => {
  try {
    const student = await prisma.users.findUnique({
      where: { id: studentId },
      include: {
        Classrooms: {
          select: {
            id: true,
            name: true,
          },
        },
        Attendances: {
          select: {
            subject: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
      omit: {
        password: true,
        createdAt: true,
        updatedAt: true,
        role: true,
        classroomsId: true,
      },
    })

    if (!student) {
      return { success: false, error: "Student not found" }
    }

    console.log(student)

    return {
      success: true,
      student: {
        id: student.id,
        email: student.email,
        name: student.name,
        classroom: student.Classrooms?.name || null,
      },
    }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Something went wrong",
    }
  }
}

export const getStudentsByClassroom = async (classroomId: string): ActionOutput<{
  students: {
    id: string
    email: string
    name: string
  }[]
}> => {
  try {
    const students = await prisma.users.findMany({
      where: { classroomsId: classroomId },
      omit: {
        password: true,
        createdAt: true,
        updatedAt: true,
        role: true,
        classroomsId: true,
      },
    })

    return {
      success: true,
      students: students.map((student) => ({
        id: student.id,
        email: student.email,
        name: student.name,
      })),
    }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Something went wrong",
    }
  }
}
