"use server"

import { prisma } from "@/lib/db"
import type { CreateSubjectSchema } from "@/lib/validators"

export async function getSubjectsByClassroomId(
  classroomId: string
): ActionOutput<{
  subjects: {
    id: string
    name: string
    classroomId: string
    faculty: {
      id: string
      email: string
    }
  }[]
  studentsCount: number
}> {
  try {
    if (!classroomId) {
      return {
        success: false,
        error: "Classroom ID is required",
      }
    }
    const subjects = await prisma.subjects.findMany({
      where: {
        classroomId: classroomId,
      },
      include: {
        faculty: {
          select: {
            id: true,
            email: true,
          },
        },
        classrooms: {
          select: {
            _count: {
              select: {
                students: true,
              },
            },
          },
        },
      },
      omit: {
        createdAt: true,
        updatedAt: true,
        facultyId: true,
      },
    })

    return {
      success: true,
      subjects,
      studentsCount: subjects[0]?.classrooms?._count?.students || 0,
    }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    }
  }
}

export async function createSubject(
  data: CreateSubjectSchema,
  facultyId: string,
  classroomId: string
): ActionOutput {
  try {
    await prisma.subjects.create({
      data: {
        name: data.name,
        classroomId,
        facultyId,
      },
    })
    return {
      success: true,
    }
  } catch (error) {
    console.log(error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    }
  }
}
