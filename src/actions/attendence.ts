"use server"

import { prisma } from "@/lib/db"

export const isAttendenceTookToday = async (
  classroomId: string,
  facultyId: string
): ActionOutput<{ isTookToday: boolean; subjectId: string }> => {
  try {
    const subject = await prisma.subjects.findFirst({
      where: {
        facultyId,
        AND: {
          classroomId,
        },
      },
      select: {
        id: true,
      },
    })

    if (!subject) {
      throw Error("Subject not Found")
    }

    const date = new Date().getDate().toString()
    const attend = await prisma.attendances.findFirst({
      where: {
        date,
        AND: {
          subject: {
            classroomId,
            AND: {
              facultyId,
            },
          },
        },
      },
      select: {
        id: true,
      },
    })

    return {
      success: true,
      isTookToday: !!attend,
      subjectId: subject.id,
    }
  } catch (e) {
    return {
      success: false,
      error: e instanceof Error ? e.message : "Something went wrong",
    }
  }
}

export const saveAttendance = async (
  data: { id: string; email: string; checked: boolean }[],
  subjectId: string
): ActionOutput => {
  try {
    const date = new Date().getDate().toString()
    await prisma.attendances.createMany({
      data: data.map((user) => ({
        date,
        studentId: user.id,
        isPresent: user.checked,
        subjectId,
      })),
    })

    return {
      success: true,
    }
  } catch (e) {
    return {
      success: false,
      error: e instanceof Error ? e.message : "Something went wrong",
    }
  }
}

export const getAttendences = async (
  studentId: string
): ActionOutput<{
  attendences: {
    subjectId: string
    subjectName: string
    totalClasses: number
    classesAttended: number
    percentage: number
  }[]
}> => {
  try {
    const attendanceRecords = await prisma.attendances.groupBy({
      by: ["subjectId"],
      where: {
        studentId: studentId,
      },
      _count: {
        _all: true, // Total classes
        isPresent: true, // Classes attended (where isPresent is true)
      },
    })

    const attendanceBySubject = await Promise.all(
      attendanceRecords.map(async (record) => {
        const subject = await prisma.subjects.findUnique({
          where: { id: record.subjectId },
          select: { id: true, name: true },
        })

        const totalClasses = record._count._all
        const classesAttended = record._count.isPresent
        const percentage =
          totalClasses > 0 ? (classesAttended / totalClasses) * 100 : 0

        return {
          subjectId: record.subjectId,
          subjectName: subject?.name || "Unknown",
          totalClasses,
          classesAttended,
          percentage: Number(percentage.toFixed(2)), // Round to 2 decimal places
        }
      })
    )

    return {
      success: true,
      attendences: attendanceBySubject,
    }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.name : "Something went wrong",
    }
  }
}